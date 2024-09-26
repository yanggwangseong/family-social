import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LikesCache } from '@/models/cache/likes-cache';
import { CommentEntity } from '@/models/entities/comment.entity';
import { LikeCommentEntity } from '@/models/entities/like-comment.entity';
import { CommentsRepository } from '@/models/repositories/comments.repository';
import { LikesCommentRepository } from '@/models/repositories/likes-comment.repository';

import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { MentionsModule } from '../mentions/mentions.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([CommentEntity, LikeCommentEntity]),
		MentionsModule,
	],
	controllers: [CommentsController],
	providers: [
		CommentsService,
		CommentsRepository,
		LikesCommentRepository,
		LikesCache,
	],
	exports: [CommentsService],
})
export class CommentsModule {}
