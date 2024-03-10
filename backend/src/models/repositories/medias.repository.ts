import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, QueryRunner, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { MediaCreateReqDto } from '../dto/media/req/media-create-req.dto';
import { MediaUpdateReqDto } from '../dto/media/req/media-update-req-dto';
import { FeedMediaEntity } from '../entities/feed-media.entity';

@Injectable()
export class MediasRepository extends Repository<FeedMediaEntity> {
	constructor(
		@InjectRepository(FeedMediaEntity)
		private readonly repository: Repository<FeedMediaEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	getMediasRepository(qr?: QueryRunner) {
		return qr
			? qr.manager.getRepository<FeedMediaEntity>(FeedMediaEntity)
			: this.repository;
	}

	async createFeedMedias(
		media: MediaCreateReqDto[],
		feedId: string,
		qr?: QueryRunner,
	): Promise<void> {
		const mediasRepository = this.getMediasRepository(qr);

		media.map(async (media: MediaCreateReqDto) => {
			await mediasRepository.insert({
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
		qr: QueryRunner,
	): Promise<[boolean, void]> {
		const result = Promise.all([
			await this.deleteFeedMediasByFeedId(feedId, qr),
			await this.createFeedMedias(media, feedId, qr),
		]);

		return result;
	}

	async deleteFeedMediasByFeedId(
		feedId: string,
		qr: QueryRunner,
	): Promise<boolean> {
		const mediasRepository = this.getMediasRepository(qr);

		const { affected } = await mediasRepository.delete({
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
