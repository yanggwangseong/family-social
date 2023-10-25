import { CommentsRepository } from '@/models/repositories/comments.repository';
import { LikesCommentRepository } from '@/models/repositories/likes-comment.repository';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class CommentsService {
	constructor(
		private readonly commentsRepository: CommentsRepository,
		private readonly likesCommentRepository: LikesCommentRepository,
		private dataSource: DataSource,
	) {}
}
