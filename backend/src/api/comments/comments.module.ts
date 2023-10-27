import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsRepository } from '@/models/repositories/comments.repository';
import { LikesCommentRepository } from '@/models/repositories/likes-comment.repository';
import { CommentEntity } from '@/models/entities/comment.entity';
import { LikeCommentEntity } from '@/models/entities/fam-like-comment.entity';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';

@Module({
	imports: [TypeOrmModule.forFeature([CommentEntity, LikeCommentEntity])],
	controllers: [CommentsController],
	providers: [CommentsService, CommentsRepository, LikesCommentRepository],
	exports: [CommentsService],
})
export class CommentsModule {}
