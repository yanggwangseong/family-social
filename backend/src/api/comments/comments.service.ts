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

	async createComments({
		commentContents,
		replyId,
		parentId,
		feedId,
		memberId,
	}: ICreateCommentsArgs) {
		return await this.commentsRepository.createComments({
			commentContents,
			replyId,
			parentId,
			feedId,
			memberId,
		});
	}
}
