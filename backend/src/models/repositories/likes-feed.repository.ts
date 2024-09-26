import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

import { LikeFeedEntity } from '@/models/entities/like-feed.entity';

@Injectable()
export class LikesFeedRepository extends Repository<LikeFeedEntity> {
	constructor(
		@InjectRepository(LikeFeedEntity)
		private readonly repository: Repository<LikeFeedEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	getLikesFeedRepository(qr?: QueryRunner) {
		return qr
			? qr.manager.getRepository<LikeFeedEntity>(LikeFeedEntity)
			: this.repository;
	}

	async addLike(
		memberId: string,
		feedId: string,
		qr?: QueryRunner,
	): Promise<void> {
		const repository = this.getLikesFeedRepository(qr);
		await repository.save({ memberId, feedId });
	}

	async removeLike(
		memberId: string,
		feedId: string,
		qr?: QueryRunner,
	): Promise<void> {
		const repository = this.getLikesFeedRepository(qr);
		await repository.delete({ memberId, feedId });
	}

	async getLikesByFeedId(feedId: string): Promise<LikeFeedEntity[]> {
		return await this.repository.find({ where: { feedId } });
	}

	async countLikesByFeedId(feedId: string): Promise<number> {
		return this.count({ where: { feedId } });
	}

	async hasUserLiked(memberId: string, feedId: string): Promise<boolean> {
		const like = await this.findOne({ where: { memberId, feedId } });
		return !!like;
	}
}
