import { Injectable } from '@nestjs/common';
import { CommentEntity } from '../entities/comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentsRepository extends Repository<CommentEntity> {
	constructor(
		@InjectRepository(CommentEntity)
		private readonly repository: Repository<CommentEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}
}
