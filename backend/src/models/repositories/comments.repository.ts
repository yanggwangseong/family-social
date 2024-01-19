import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { ICreateCommentsArgs } from '@/types/args/comment';

import { CommentEntity } from '../entities/comment.entity';

@Injectable()
export class CommentsRepository extends Repository<CommentEntity> {
	constructor(
		@InjectRepository(CommentEntity)
		private readonly repository: Repository<CommentEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
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

	async createComment({
		commentContents,
		replyId,
		parentId,
		feedId,
		memberId,
	}: ICreateCommentsArgs) {
		await this.repository.insert({
			id: uuidv4(),
			commentContents: commentContents,
			replyId: replyId,
			parentId: parentId,
			feedId: feedId,
			memberId: memberId,
		});
	}

	async updateComment(commentId: string, commentContents: string) {
		await this.update({ id: commentId }, { commentContents: commentContents });
	}

	async deleteComment(commentId: string) {
		const { affected } = await this.delete({
			id: commentId,
		});

		return !!affected;
	}
}
