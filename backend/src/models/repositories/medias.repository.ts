import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

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
		insertMedias: QueryDeepPartialEntity<FeedMediaEntity>[],
		qr?: QueryRunner,
	): Promise<void> {
		const mediasRepository = this.getMediasRepository(qr);

		await mediasRepository.insert(insertMedias);
	}

	async updateFeedMedias(
		newMedias: QueryDeepPartialEntity<FeedMediaEntity>[],
		feedId: string,
		qr?: QueryRunner,
	): Promise<[boolean, void]> {
		const result = await Promise.all([
			await this.deleteFeedMediasByFeedId(feedId, qr),
			await this.createFeedMedias(newMedias, qr),
		]);

		return result;
	}

	async deleteFeedMediasByFeedId(
		feedId: string,
		qr?: QueryRunner,
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
