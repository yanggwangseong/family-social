import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LikeCommentEntity } from '../entities/like-comment.entity';

@Injectable()
export class LikesCommentRepository extends Repository<LikeCommentEntity> {
	constructor(
		@InjectRepository(LikeCommentEntity)
		private readonly repository: Repository<LikeCommentEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async findMemberLikesComment(memberId: string, commentId: string) {
		return await this.repository.findOneBy({
			memberId: memberId,
			commentId: commentId,
		});
	}

	async getLikedByComments(commentId: string) {
		return await this.repository.find({
			select: {
				memberId: true,
				commentId: true,
			},
			where: {
				commentId,
			},
		});
	}
}
