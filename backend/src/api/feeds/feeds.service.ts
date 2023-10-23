import { FeedByIdResDto } from '@/models/dto/feed/res/feed-by-id-res.dto';
import { FeedsRepository } from '@/models/repositories/feeds.repository';
import { ICreateFeedArgs, IUpdateFeedArgs } from '@/types/args/feed';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MediasService } from '../medias/medias.service';
import {
	EntityConflictException,
	EntityNotFoundException,
} from '@/common/exception/service.exception';
import { FeedEntity } from '@/models/entities/feed.entity';
import { FeedMediaEntity } from '@/models/entities/fam-feed-media.entity';
import { extractFilePathFromUrl } from '@/utils/extract-file-path';
import { DeleteS3Media } from '@/utils/upload-media';
import {
	ERROR_DELETE_FEED_OR_MEDIA,
	ERROR_FEED_NOT_FOUND,
	ERROR_FILE_DIR_NOT_FOUND,
} from '@/constants/business-error';
import { getOffset } from '@/utils/getOffset';
import { FeedResDto } from '@/models/dto/feed/res/feed-res.dto';
import { LikesFeedRepository } from '@/models/repositories/likes-feed.repository';
import { FeedGetAllResDto } from '@/models/dto/feed/res/feed-get-all-res.dto';

@Injectable()
export class FeedsService {
	constructor(
		private readonly feedsRepository: FeedsRepository,
		private readonly mediasService: MediasService,
		private readonly likesFeedRepository: LikesFeedRepository,
		private dataSource: DataSource,
	) {}

	async findFeedInfoById(feedId: string): Promise<FeedResDto> {
		// 피드가 있는지 확인.
		await this.findFeedByIdOrThrow(feedId);

		//const feed = await this.feedsRepository.findFeedInfoById(feedId);
		//const medias = await this.mediasService.findMediaUrlByFeedId(feedId);

		const [feed, medias] = await Promise.all([
			await this.feedsRepository.findFeedInfoById(feedId),
			await this.mediasService.findMediaUrlByFeedId(feedId),
		]);
		return {
			feedId: feed.id,
			contents: feed.contents,
			isPublic: feed.isPublic,
			groupId: feed.group.id,
			groupName: feed.group.groupName,
			memberId: feed.member.id,
			username: feed.member.username,
			medias: medias,
		};
	}

	async findAllFeed(page: number): Promise<FeedGetAllResDto> {
		const { take, skip } = getOffset(page);
		const { list, count } = await this.feedsRepository.findAllFeed(take, skip);

		//[TODO comments 추후에 추가]
		const mappedList = await Promise.all(
			list.map(async (feed) => {
				const medias = await this.mediasService.findMediaUrlByFeedId(
					feed.feedId,
				);

				return {
					...feed,
					medias: medias,
				};
			}),
		);

		return {
			list: mappedList,
			page: page,
			totalPage: Math.ceil(count / take),
		};
	}

	async updateLikesFeedId(memberId: string, feedId: string): Promise<boolean> {
		// 피드가 있는지 확인.
		await this.findFeedByIdOrThrow(feedId);

		const like = await this.likesFeedRepository.findMemberLikesFeed(
			memberId,
			feedId,
		);

		if (like) {
			await this.likesFeedRepository.remove(like);
		} else {
			await this.likesFeedRepository.save({ memberId, feedId });
		}

		return !like;
	}

	async createFeed({
		contents,
		isPublic,
		groupId,
		memberId,
		medias,
	}: ICreateFeedArgs): Promise<FeedByIdResDto> {
		//[TODO] transaction 추가
		const feed = await this.feedsRepository.createFeed({
			contents,
			isPublic,
			groupId,
			memberId,
		});

		await this.mediasService.createFeedMedias(medias, feed.id);

		return feed;
	}

	async updateFeed({
		feedId,
		contents,
		isPublic,
		groupId,
		medias,
	}: IUpdateFeedArgs) {
		// 피드가 있는지 확인.
		await this.findFeedByIdOrThrow(feedId);

		//[TODO] transaction 추가
		const feed = await this.feedsRepository.updateFeed({
			feedId,
			contents,
			isPublic,
			groupId,
		});

		await this.mediasService.updateFeedMedias(medias, feedId);

		return feed;
	}

	async deleteFeed(feedId: string) {
		// 피드가 있는지 확인.
		await this.findFeedByIdOrThrow(feedId);

		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			const [mediaStatus, feedStatus] = await Promise.all([
				await this.mediasService.deleteFeedMediasByFeedId(
					feedId,
					queryRunner.manager,
				),
				await this.feedsRepository.deleteFeed(feedId, queryRunner.manager),
			]);

			if (!mediaStatus || !feedStatus)
				throw EntityConflictException(ERROR_DELETE_FEED_OR_MEDIA);

			const medias = await this.mediasService.findMediaUrlByFeedId(feedId);
			medias.map(async (media) => {
				const fileName = extractFilePathFromUrl(media.url, 'feed');
				if (!fileName) throw EntityNotFoundException(ERROR_FILE_DIR_NOT_FOUND);
				await DeleteS3Media(fileName);
			});

			await queryRunner.commitTransaction();
			//s3에 미디어 파일들 삭제.
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw error;
		} finally {
			await queryRunner.release();
		}
	}

	async findFeedByIdOrThrow(feedId: string): Promise<FeedByIdResDto> {
		const feed = await this.feedsRepository.findFeedById(feedId);

		if (!feed) {
			throw EntityNotFoundException(ERROR_FEED_NOT_FOUND);
		}

		return feed;
	}
}
