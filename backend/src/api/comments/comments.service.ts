import {
	EntityConflictException,
	EntityNotFoundException,
} from '@/common/exception/service.exception';
import {
	ERROR_COMMENT_NOT_FOUND,
	ERROR_DELETE_COMMENT,
} from '@/constants/business-error';
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

	async getCommentsByFeedId(feedId: string) {
		return await this.commentsRepository.getCommentsByFeedId(feedId);
	}

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

	async deleteComment(commentId: string) {
		const deleteStatus = await this.commentsRepository.deleteComment(commentId);

		if (!deleteStatus) throw EntityConflictException(ERROR_DELETE_COMMENT);
	}

	async findCommentByIdOrThrow(commentId: string) {
		const comment = await this.commentsRepository.findOneBy({
			id: commentId,
		});
		console.log('comment', comment);
		if (!comment) {
			throw EntityNotFoundException(ERROR_COMMENT_NOT_FOUND);
		}

		return comment;
	}
}
