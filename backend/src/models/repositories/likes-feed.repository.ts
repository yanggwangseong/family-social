import { Repository } from 'typeorm';
import { LikeFeedEntity } from '@/models/entities/fam-like-feed.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LikesFeedRepository extends Repository<LikeFeedEntity> {
	constructor(
		@InjectRepository(LikeFeedEntity)
		private readonly repository: Repository<LikeFeedEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async findMemberLikesFeed(memberId: string, feedId: string) {
		return await this.repository.findOneBy({
			memberId: memberId,
			feedId: feedId,
		});
	}
}
