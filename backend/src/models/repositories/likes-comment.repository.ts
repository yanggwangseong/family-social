import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LikeCommentEntity } from '../entities/fam-like-comment.entity';
import { InjectRepository } from '@nestjs/typeorm';

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
}
