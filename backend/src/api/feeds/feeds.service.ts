import { FeedByIdResDto } from '@/models/dto/feed/res/feed-by-id-res.dto';
import { FeedsRepository } from '@/models/repositories/feeds.repository';
import { ICreateFeedArgs, IUpdateFeedArgs } from '@/types/args/feed';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MediasService } from '../medias/medias.service';
import { EntityConflictException } from '@/common/exception/service.exception';

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
		//[TODO] 이미지배열과, 피드 관련 정보 가져와서 feed repository에는 피드저장, midea repository에는 미디어들 저장
		const feed = await this.feedsRepository.createFeed({
			contents,
			isPublic,
			groupId,
			memberId,
		});

		await this.mediasService.createFeedMedias(medias, feed.id);

		return feed;
	}

	async updateFeed({ feedId, contents, isPublic, groupId }: IUpdateFeedArgs) {
		return await this.feedsRepository.updateFeed({
			feedId,
			contents,
			isPublic,
			groupId,
		});
	}

	async deleteFeed(feedId: string) {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			const status = await this.mediasService.deleteFeedMediasByFeedId(feedId);
			if (!status)
				throw EntityConflictException(
					'미디어를 삭제하는 도중 에러가 발생했습니다',
				);
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw error;
		} finally {
			await queryRunner.release();
		}
	}
}
