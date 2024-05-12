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

	async findMemberLikesFeed(
		memberId: string,
		feedId: string,
		qr?: QueryRunner,
	) {
		const repository = this.getLikesFeedRepository(qr);
		return await repository.findOneBy({
			memberId: memberId,
			feedId: feedId,
		});
	}
}
