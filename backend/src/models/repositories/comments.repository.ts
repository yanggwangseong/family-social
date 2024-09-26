import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, QueryRunner, Repository } from 'typeorm';

import { OverrideInsertFeild } from '@/types/repository';

import { CommentEntity } from '../entities/comment.entity';

@Injectable()
export class CommentsRepository extends Repository<CommentEntity> {
	constructor(
		@InjectRepository(CommentEntity)
		private readonly repository: Repository<CommentEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	getCommentsRepository(qr?: QueryRunner) {
		return qr
			? qr.manager.getRepository<CommentEntity>(CommentEntity)
			: this.repository;
	}

	async getUserIdAndNameByCommentId(commentId: string) {
		const comment = await this.repository.findOneOrFail({
			select: {
				member: {
					id: true,
					username: true,
				},
			},
			where: {
				id: commentId,
			},
			relations: {
				member: true,
			},
		});

		return {
			id: comment.member.id,
			username: comment.member.username,
		};
	}

	async getCommentsByFeedId(feedId: string) {
		return await this.repository.find({
			select: {
				id: true,
				commentContents: true,
				replyId: true,
				parentId: true,
				feedId: true,
				updatedAt: true,
				childrenComments: true,
				member: {
					id: true,
					username: true,
				},
			},
			where: {
				parentId: IsNull(),
				feedId: feedId,
			},
			relations: {
				childrenComments: true,
				member: true,
				LikedByComments: true,
			},
			order: {
				createdAt: 'asc',
				childrenComments: {
					createdAt: 'asc',
				},
			},
		});
	}

	async createComment(
		overrideInsertFeilds: OverrideInsertFeild<CommentEntity>,
		qr?: QueryRunner,
	) {
		const commentsRepository = this.getCommentsRepository(qr);

		const insertResult = await commentsRepository.insert(overrideInsertFeilds);

		const id: string = insertResult.identifiers[0].id;

		return id;
	}

	async updateComment(
		commentId: string,
		commentContents: string,
		qr?: QueryRunner,
	) {
		const commentsRepository = this.getCommentsRepository(qr);

		await commentsRepository.update(
			{ id: commentId },
			{ commentContents: commentContents },
		);
	}

	async deleteComment(commentId: string, qr?: QueryRunner) {
		const commentsRepository = this.getCommentsRepository(qr);

		const { affected } = await commentsRepository.delete({
			id: commentId,
		});

		return !!affected;
	}

	async findAllCommentIds(): Promise<string[]> {
		return await this.repository
			.find({ select: { id: true } })
			.then((comments) => comments.map((comment) => comment.id));
	}
}
