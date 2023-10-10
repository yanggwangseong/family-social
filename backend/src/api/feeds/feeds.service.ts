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

@Injectable()
export class FeedsService {
	constructor(
		private readonly feedsRepository: FeedsRepository,
		private readonly mediasService: MediasService,
		private dataSource: DataSource,
	) {}

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
				throw EntityConflictException(
					'미디어 또는 피드를 삭제하는 도중 에러가 발생했습니다',
				);

			const medias = await this.mediasService.findMediaUrlByFeedId(feedId);
			medias.map(async (media) => {
				const fileName = extractFilePathFromUrl(media.url, 'feed');
				if (!fileName)
					throw EntityNotFoundException('파일 경로를 찾을 수 없습니다');
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
}
