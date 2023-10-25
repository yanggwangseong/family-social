import { Injectable } from '@nestjs/common';
import { CommentEntity } from '../entities/comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ICreateCommentsArgs } from '@/types/args/comment';

@Injectable()
export class CommentsRepository extends Repository<CommentEntity> {
	constructor(
		@InjectRepository(CommentEntity)
		private readonly repository: Repository<CommentEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
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
}
