import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { groupBy } from 'es-toolkit';
import { QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { QueryRunnerWithRedis } from '@/common/decorators/query-runner-with-redis.decorator';
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
import { ENV_LIKE_CACHE_TYPE_FEED } from '@/constants/env-keys.const';
import {
	LIKE_CACHE_TYPE_FEED,
	MENTION_ON_FEED,
} from '@/constants/string-constants';
import { LikesCache } from '@/models/cache/likes-cache';
import { FeedPaginationReqDto } from '@/models/dto/feed/req/feed-pagination-req.dto';
import { FeedByIdResDto } from '@/models/dto/feed/res/feed-by-id-res.dto';
import { FeedMyGroupResDto } from '@/models/dto/feed/res/feed-my-group-res.dto';
import { FeedResDto } from '@/models/dto/feed/res/feed-res.dto';
import { GroupFeedsPaginationReqDto } from '@/models/dto/group/req/group-feeds-pagination-req.dto';
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
	private readonly _likeCacheType;

	constructor(
		private readonly feedsRepository: FeedsRepository,
		private readonly mediasService: MediasService,
		private readonly commentsService: CommentsService,
		private readonly mentionsService: MentionsService,
		private readonly likesFeedRepository: LikesFeedRepository,
		private readonly likesCache: LikesCache,
		private readonly configService: ConfigService,
	) {
		this._likeCacheType = this.configService.get<typeof LIKE_CACHE_TYPE_FEED>(
			ENV_LIKE_CACHE_TYPE_FEED,
		)!;
	}

	/**
	 * 서버 시작 시 모든 피드의 좋아요를 Redis와 동기화 (Cache Warming)
	 */
	async onModuleInit() {
		const feedIds = await this.getAllFeedIds();
		for (const feedId of feedIds) {
			const likes = await this.likesFeedRepository.getLikesByFeedId(feedId);
			const memberIds = likes.map((like) => like.memberId);
			await this.likesCache.syncLikes(this._likeCacheType, feedId, memberIds);
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
			this.feedsRepository.findFeedInfoById(feedId),
			this.getMediaUrlAndCommentsByFeedId(feedId, memberId),
			this.mentionsService.findMentionsByFeedId(feedId, mentionTypeId),
		]);
	}

	/**
	 * 피드 상세 정보를 조회
	 * @param feedIdArgs 피드 ID
	 * @param mentionTypeId 멘션 타입 ID
	 * @param memberIdArgs 사용자 ID
	 * @returns 피드 상세 정보
	 */
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

		const [sumLike, myLike] = await Promise.all([
			this.getLikeCount(feedId),
			this.hasUserLiked(memberId, feedId),
		]);

		return {
			feedId,
			...feedRest,
			sumLike,
			myLike,
			groupId,
			...groupRest,
			memberId,
			...memberRest,
			medias,
			comments,
			mentions,
			sumComment: comments.length,
		};
	}

	/**
	 * Look-aside
	 * 좋아요 수를 조회할 때는 Redis에서 바로 가져오고, 캐시 미스 시 데이터베이스에서 읽어온 뒤 캐시에 저장
	 * @param feedId 피드 ID
	 * @returns 좋아요 수
	 */
	private async getLikeCount(feedId: string): Promise<number> {
		const cachedCount = await this.likesCache.getLikeCount(
			this._likeCacheType,
			feedId,
		);

		if (cachedCount > 0) {
			return cachedCount;
		}

		// Cache miss 시 데이터베이스에서 읽어온 뒤 캐시에 저장
		const count = await this.likesFeedRepository.countLikesByFeedId(feedId);
		await this.likesCache.setLikeCount(this._likeCacheType, feedId, count);
		return count;
	}

	/**
	 * Look-aside
	 * 사용자가 피드에 좋아요를 눌렀는지 여부를 가져온다.
	 * 캐시에서 바로 가져오고, 캐시 미스 시 데이터베이스에서 읽어온 뒤 캐시에 저장
	 * @param memberId 사용자 ID
	 * @param feedId 피드 ID
	 * @returns 사용자가 피드에 좋아요를 눌렀는지 여부
	 */
	private async hasUserLiked(
		memberId: string,
		feedId: string,
	): Promise<boolean> {
		const cachedLike = await this.likesCache.hasLiked(
			this._likeCacheType,
			memberId,
			feedId,
		);

		if (cachedLike) return cachedLike;

		// 데이터베이스에서 읽어온 뒤 캐시에 저장
		const hasLiked = await this.likesFeedRepository.hasUserLiked(
			memberId,
			feedId,
		);
		await this.likesCache.setUserLike(
			this._likeCacheType,
			memberId,
			feedId,
			hasLiked,
		);
		return hasLiked;
	}

	/**
	 * 그룹별 사용자가 올린 피드 가져오기
	 */
	async findFeedsByBelongToGroups(
		memberId: string,
		paginationDto: GroupFeedsPaginationReqDto,
		pagination: Pagination<FeedEntity>,
	): Promise<BasicPaginationResponse<FeedMyGroupResDto>> {
		const { page, limit } = paginationDto;
		const { take, skip } = getOffset({ page, limit });

		const mentionTypeId = await this.mentionsService.findMentionIdByMentionType(
			MENTION_ON_FEED,
		);

		const query = await this.feedsRepository.findFeedsByBelongToGroups({
			memberId,
			take,
			skip,
		});

		const {
			list,
			count,
		}: {
			list: Omit<FeedResDto, 'medias' | 'comments' | 'mentions'>[];
			count: number;
		} = await pagination.paginateQueryBuilder(paginationDto, query);

		const mappedList = await Promise.all(
			list.map(async (feed) => {
				const [[medias, comments], mentions] = await Promise.all([
					this.getMediaUrlAndCommentsByFeedId(feed.feedId, memberId),
					this.mentionsService.findMentionsByFeedId(feed.feedId, mentionTypeId),
				]);

				return {
					...feed,
					medias,
					comments,
					mentions,
				};
			}),
		);

		// return Object.values(
		// 	feeds.reduce<GroupedFeeds>((acc, feed) => {
		// 		const {
		// 			groupId,
		// 			groupName,
		// 			groupDescription,
		// 			groupCoverImage,
		// 			...rest
		// 		} = feed;

		// 		const accKey = feed.groupId;
		// 		if (!acc[accKey]) {
		// 			acc[feed.groupId] = {
		// 				groupId: groupId,
		// 				groupName: groupName,
		// 				groupDescription: groupDescription,
		// 				groupCoverImage: groupCoverImage,
		// 				feeds: [],
		// 			};
		// 		}

		// 		acc[feed.groupId].feeds.push(rest);
		// 		return acc;
		// 	}, {}),
		// );

		const mappedResult = Object.entries(
			groupBy(mappedList, (feed) => feed.groupId),
		).map(([groupId, feeds]) => {
			const { groupName, groupDescription, groupCoverImage } = feeds[0];
			return {
				groupId,
				groupName,
				groupDescription,
				groupCoverImage,
				feeds,
			};
		});

		return {
			list: mappedResult,
			page,
			count,
			take,
		};
	}

	async findAllFeed(
		memberId: string,
		paginationDto: FeedPaginationReqDto,
		pagination: Pagination<FeedEntity>,
		userGroupIds: string[],
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
			userGroupIds,
		});

		const {
			list,
			count,
		}: {
			list: Omit<FeedResDto, 'medias' | 'comments' | 'mentions'>[];
			count: number;
		} = await pagination.paginateQueryBuilder(paginationDto, query);

		const mappedList = await Promise.all(
			list.map(async (feed) => {
				const [[medias, comments], mentions] = await Promise.all([
					this.getMediaUrlAndCommentsByFeedId(feed.feedId, memberId),
					this.mentionsService.findMentionsByFeedId(feed.feedId, mentionTypeId),
				]);

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
		qrAndRedis: QueryRunnerWithRedis,
	): Promise<boolean> {
		const { queryRunner, redisMulti } = qrAndRedis;
		const hasLiked = await this.likesCache.hasLiked(
			this._likeCacheType,
			memberId,
			feedId,
		);

		if (hasLiked) {
			await this.likesCache.removeLike(
				this._likeCacheType,
				memberId,
				feedId,
				redisMulti,
			);
			await this.likesFeedRepository.removeLike(memberId, feedId, queryRunner);
		} else {
			await this.likesCache.addLike(
				this._likeCacheType,
				memberId,
				feedId,
				redisMulti,
			);
			await this.likesFeedRepository.addLike(memberId, feedId, queryRunner);
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
			this.mediasService.findMediaUrlByFeedId(feedId),
			this.commentsService.getCommentsByFeedId(feedId, memberId),
		]);
	}
}
