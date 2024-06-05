import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

import { OverrideInsertArrayFeild } from '@/types/repository';

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
		overrideInsertArrayFeild: OverrideInsertArrayFeild<FeedMediaEntity>,
		qr?: QueryRunner,
	): Promise<void> {
		const mediasRepository = this.getMediasRepository(qr);

		await mediasRepository.insert(overrideInsertArrayFeild);
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
