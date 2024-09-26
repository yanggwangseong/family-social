import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

import { LikeCommentEntity } from '../entities/like-comment.entity';

@Injectable()
export class LikesCommentRepository extends Repository<LikeCommentEntity> {
	constructor(
		@InjectRepository(LikeCommentEntity)
		private readonly repository: Repository<LikeCommentEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	getLikesCommentRepository(qr?: QueryRunner) {
		return qr
			? qr.manager.getRepository<LikeCommentEntity>(LikeCommentEntity)
			: this.repository;
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

	async addLike(
		memberId: string,
		commentId: string,
		qr?: QueryRunner,
	): Promise<void> {
		const repository = this.getLikesCommentRepository(qr);
		await repository.save({ memberId, commentId });
	}

	async removeLike(
		memberId: string,
		commentId: string,
		qr?: QueryRunner,
	): Promise<void> {
		const repository = this.getLikesCommentRepository(qr);
		await repository.delete({ memberId, commentId });
	}

	async getLikesByCommentId(commentId: string): Promise<LikeCommentEntity[]> {
		return await this.repository.find({ where: { commentId } });
	}

	async hasUserLiked(memberId: string, commentId: string): Promise<boolean> {
		const count = await this.repository.count({
			where: { memberId, commentId },
		});
		return count > 0;
	}

	async countLikesByCommentId(commentId: string): Promise<number> {
		return this.count({ where: { commentId } });
	}
}
