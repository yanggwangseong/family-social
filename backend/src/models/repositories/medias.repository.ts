import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { MediaCreateReqDto } from '../dto/media/req/media-create-req.dto';
import { MediaUpdateReqDto } from '../dto/media/req/media-update-req-dto';
import { FeedMediaEntity } from '../entities/fam-feed-media.entity';

@Injectable()
export class MediasRepository extends Repository<FeedMediaEntity> {
	constructor(
		@InjectRepository(FeedMediaEntity)
		private readonly repository: Repository<FeedMediaEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async createFeedMedias(
		media: MediaCreateReqDto[],
		feedId: string,
	): Promise<void> {
		media.map(async (media: MediaCreateReqDto) => {
			await this.repository.insert({
				id: uuidv4(),
				url: media.url,
				position: media.position,
				feedId: feedId,
			});
		});
	}

	async updateFeedMedias(
		media: MediaUpdateReqDto[],
		feedId: string,
	): Promise<[boolean, void]> {
		const result = Promise.all([
			await this.deleteFeedMediasByFeedId(feedId),
			await this.createFeedMedias(media, feedId),
		]);

		return result;
	}

	async deleteFeedMediasByFeedId(
		feedId: string,
		manager?: EntityManager,
	): Promise<boolean> {
		if (manager) {
			const { affected } = await manager.delete(FeedMediaEntity, {
				feedId: feedId,
			});
			return !!affected;
		}

		const { affected } = await this.delete({
			feedId: feedId,
		});

		return !!affected;
	}

	async findMediaUrlByFeedId(
		feedId: string,
	): Promise<{ url: string; id: string }[]> {
		return this.repository.find({
			select: {
				id: true,
				url: true,
			},
			where: {
				feedId: feedId,
			},
			order: {
				position: 'ASC',
			},
		});
	}
}
