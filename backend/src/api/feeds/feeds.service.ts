import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import {
	EntityConflictException,
	EntityNotFoundException,
} from '@/common/exception/service.exception';
import { Pagination } from '@/common/strategies/context/pagination';
import {
	ERROR_DELETE_FEED_OR_MEDIA,
	ERROR_FEED_NOT_FOUND,
	ERROR_FILE_DIR_NOT_FOUND,
} from '@/constants/business-error';
import { MENTION_ON_FEED } from '@/constants/string-constants';
import { LikesFeedCache } from '@/models/cache/likes-feed.cache';
import { FeedPaginationReqDto } from '@/models/dto/feed/req/feed-pagination-req.dto';
import { FeedByIdResDto } from '@/models/dto/feed/res/feed-by-id-res.dto';
import { FeedResDto } from '@/models/dto/feed/res/feed-res.dto';
import { FeedEntity } from '@/models/entities/feed.entity';
import { FeedsRepository } from '@/models/repositories/feeds.repository';
import { LikesFeedRepository } from '@/models/repositories/likes-feed.repository';
import { ICreateFeedArgs, IUpdateFeedArgs } from '@/types/args/feed';
import { BasicPaginationResponse } from '@/types/pagination';
import { extractFilePathFromUrl } from '@/utils/extract-file-path';
import { getOffset } from '@/utils/getOffset';
import { DeleteS3Media } from '@/utils/upload-media';

import { CommentsService } from '../comments/comments.service';
import { MediasService } from '../medias/medias.service';
import { MentionsService } from '../mentions/mentions.service';

@Injectable()
export class FeedsService implements OnModuleInit {
	constructor(
		private readonly feedsRepository: FeedsRepository,
		private readonly mediasService: MediasService,
		private readonly commentsService: CommentsService,
		private readonly mentionsService: MentionsService,
		private readonly likesFeedRepository: LikesFeedRepository,
		private readonly likesFeedCache: LikesFeedCache,
		private dataSource: DataSource,
	) {}

	/**
	 * 서버 시작 시 모든 피드의 좋아요를 Redis와 동기화 (Cache Warming)
	 */
	async onModuleInit() {
		const feedIds = await this.getAllFeedIds();
		for (const feedId of feedIds) {
			const likes = await this.likesFeedRepository.getLikesByFeedId(feedId);
			const memberIds = likes.map((like) => like.memberId);
			await this.likesFeedCache.syncLikes(feedId, memberIds);
		}
	}

	/**
	 * 모든 피드의 ID를 가져온다.
	 * @returns 모든 피드의 ID
	 */
	private async getAllFeedIds(): Promise<string[]> {
		// 모든 피드의 ID를 가져온다.
		return await this.feedsRepository.findAllFeedIds();
	}

	private async fetchFeedDetails(
		feedId: string,
		memberId: string,
		mentionTypeId: string,
	) {
		return Promise.all([
			await this.feedsRepository.findFeedInfoById(feedId),
			await this.getMediaUrlAndCommentsByFeedId(feedId, memberId),
			await this.mentionsService.findMentionsByFeedId(feedId, mentionTypeId),
		]);
	}

	async findFeedInfoById(
		feedIdArgs: string,
		mentionTypeId: string,
		memberIdArgs: string,
	): Promise<FeedResDto> {
		const [feed, [medias, comments], mentions] = await this.fetchFeedDetails(
			feedIdArgs,
			memberIdArgs,
			mentionTypeId,
		);

		const { id: feedId, group, member, ...feedRest } = feed;
		const { id: groupId, ...groupRest } = group;
		const { id: memberId, ...memberRest } = member;

		return {
			feedId,
			...feedRest,
			groupId,
			...groupRest,
			memberId,
			...memberRest,
			medias,
			comments,
			mentions,
		};
	}

	async findAllFeed(
		memberId: string,
		paginationDto: FeedPaginationReqDto,
		pagination: Pagination<FeedEntity>,
	): Promise<BasicPaginationResponse<FeedResDto>> {
		const { page, limit, groupId, options } = paginationDto;
		const { take, skip } = getOffset({ page, limit });
		const mentionTypeId = await this.mentionsService.findMentionIdByMentionType(
			MENTION_ON_FEED,
		);

		const query = await this.feedsRepository.findAllFeed({
			take,
			skip,
			memberId,
			options,
			groupId,
		});

		const {
			list,
			count,
		}: {
			list: Omit<FeedResDto, 'medias'>[];
			count: number;
		} = await pagination.paginateQueryBuilder(paginationDto, query);

		const mappedList = await Promise.all(
			list.map(async (feed) => {
				const [medias, comments] = await this.getMediaUrlAndCommentsByFeedId(
					feed.feedId,
					memberId,
				);

				const mentions = await this.mentionsService.findMentionsByFeedId(
					feed.feedId,
					mentionTypeId,
				);

				return {
					...feed,
					medias,
					comments,
					mentions,
				};
			}),
		);

		return {
			list: mappedList,
			page,
			count,
			take,
		};
	}

	async updateLikesFeedId(
		memberId: string,
		feedId: string,
		qr?: QueryRunner,
	): Promise<boolean> {
		const hasLiked = await this.likesFeedCache.hasLiked(memberId, feedId);

		if (hasLiked) {
			await this.likesFeedCache.removeLike(memberId, feedId);
			await this.likesFeedRepository.removeLike(memberId, feedId, qr);
		} else {
			await this.likesFeedCache.addLike(memberId, feedId);
			await this.likesFeedRepository.addLike(memberId, feedId, qr);
		}

		return !hasLiked;
	}

	async createFeed(
		{ medias, mentions, ...rest }: ICreateFeedArgs,
		qr?: QueryRunner,
	): Promise<FeedByIdResDto> {
		const newFeed = this.feedsRepository.create({
			id: uuidv4(),
			...rest,
		});

		const feed = await this.feedsRepository.createFeed(newFeed, qr);

		await this.mentionsService.createMentions(
			{
				mentionType: MENTION_ON_FEED,
				mentions: mentions,
				mentionSenderId: rest.memberId,
				mentionFeedId: feed.id,
			},
			qr,
		);

		await this.mediasService.createFeedMedias(medias, feed.id, qr);

		return feed;
	}

	async updateFeed({ medias, ...rest }: IUpdateFeedArgs, qr?: QueryRunner) {
		const feed = await this.feedsRepository.updateFeed(
			{
				...rest,
			},
			qr,
		);

		// mentions
		await this.mentionsService.updateMentions({
			mentionType: MENTION_ON_FEED,
			mentions: rest.mentions,
			mentionSenderId: rest.memberId,
			mentionFeedId: feed.id,
		});

		// medias
		await this.mediasService.updateFeedMedias(medias, rest.feedId, qr);

		return feed;
	}

	async deleteFeed(feedId: string, mentionTypeId: string, qr?: QueryRunner) {
		const [mediaStatus, mentionStatus, feedStatus] = await Promise.all([
			await this.mediasService.deleteFeedMediasByFeedId(feedId, qr),
			await this.mentionsService.deleteMentionsByFeedId(
				{ mentionFeedId: feedId, mentionTypeId },
				qr,
			),
			await this.feedsRepository.deleteFeed(feedId, qr),
		]);

		if (!mediaStatus || !mentionStatus || !feedStatus)
			throw EntityConflictException(ERROR_DELETE_FEED_OR_MEDIA);

		const medias = await this.mediasService.findMediaUrlByFeedId(feedId);

		await Promise.all(
			medias.map(async (media) => {
				const fileName = extractFilePathFromUrl(media.url, 'feed');
				if (!fileName) throw EntityNotFoundException(ERROR_FILE_DIR_NOT_FOUND);
				await DeleteS3Media(fileName);
			}),
		);
	}

	async findFeedByIdOrThrow(feedId: string): Promise<FeedByIdResDto> {
		const feed = await this.feedsRepository.findFeedById(feedId);

		if (!feed) {
			throw EntityNotFoundException(ERROR_FEED_NOT_FOUND);
		}

		return feed;
	}

	async isMineFeedExists(feedId: string, memberId: string): Promise<boolean> {
		return await this.feedsRepository.exist({
			where: {
				id: feedId,
				memberId,
			},
		});
	}

	private async getMediaUrlAndCommentsByFeedId(
		feedId: string,
		memberId: string,
	) {
		return await Promise.all([
			await this.mediasService.findMediaUrlByFeedId(feedId),
			await this.commentsService.getCommentsByFeedId(feedId, memberId),
		]);
	}
}
