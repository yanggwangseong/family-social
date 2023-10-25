import { EntityNotFoundException } from '@/common/exception/service.exception';
import { ERROR_COMMENT_NOT_FOUND } from '@/constants/business-error';
import { CommentsRepository } from '@/models/repositories/comments.repository';
import { LikesCommentRepository } from '@/models/repositories/likes-comment.repository';
import { ICreateCommentsArgs } from '@/types/args/comment';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class CommentsService {
	constructor(
		private readonly commentsRepository: CommentsRepository,
		private readonly likesCommentRepository: LikesCommentRepository,
		private dataSource: DataSource,
	) {}

	async createComment({
		commentContents,
		replyId,
		parentId,
		feedId,
		memberId,
	}: ICreateCommentsArgs) {
		return await this.commentsRepository.createComment({
			commentContents,
			replyId,
			parentId,
			feedId,
			memberId,
		});
	}

	async updateComment(commentId: string, commentContents: string) {
		return await this.commentsRepository.updateComment(
			commentId,
			commentContents,
		);
	}

	async findCommentByIdOrThrow(commentId: string) {
		const comment = this.commentsRepository.findOneBy({
			id: commentId,
		});

		if (!comment) {
			throw EntityNotFoundException(ERROR_COMMENT_NOT_FOUND);
		}

		return comment;
	}
}
