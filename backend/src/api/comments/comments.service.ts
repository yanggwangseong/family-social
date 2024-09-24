import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { QueryRunnerWithRedis } from '@/common/decorators/query-runner-with-redis.decorator';
import {
	EntityConflictException,
	EntityNotFoundException,
} from '@/common/exception/service.exception';
import {
	ERROR_COMMENT_NOT_FOUND,
	ERROR_DELETE_COMMENT,
} from '@/constants/business-error';
import { ENV_LIKE_CACHE_TYPE_COMMENT } from '@/constants/env-keys.const';
import {
	LIKE_CACHE_TYPE_COMMENT,
	MENTION_ON_COMMENT,
} from '@/constants/string-constants';
import { LikesCache } from '@/models/cache/likes-cache';
import { CommentGetListsResDto } from '@/models/dto/comments/res/comment-get-lists-res.dto';
import { CommentEntity } from '@/models/entities/comment.entity';
import { LikeCommentEntity } from '@/models/entities/like-comment.entity';
import { CommentsRepository } from '@/models/repositories/comments.repository';
import { LikesCommentRepository } from '@/models/repositories/likes-comment.repository';
import { ICreateCommentsArgs } from '@/types/args/comment';

import { MentionsService } from '../mentions/mentions.service';

@Injectable()
export class CommentsService implements OnModuleInit {
	private readonly _likeCacheType;

	constructor(
		private readonly commentsRepository: CommentsRepository,
		private readonly likesCommentRepository: LikesCommentRepository,
		private readonly mentionsService: MentionsService,
		private readonly likesCache: LikesCache,
		private readonly configService: ConfigService,
	) {
		this._likeCacheType = this.configService.get<
			typeof LIKE_CACHE_TYPE_COMMENT
		>(ENV_LIKE_CACHE_TYPE_COMMENT)!;
	}

	/**
	 * 서버 시작 시 모든 피드의 좋아요를 Redis와 동기화 (Cache Warming)
	 */
	async onModuleInit() {
		const commentIds = await this.getAllCommentIds();
		for (const commentId of commentIds) {
			const likes = await this.likesCommentRepository.getLikesByCommentId(
				commentId,
			);
			const memberIds = likes.map((like) => like.memberId);
			await this.likesCache.syncLikes(
				this._likeCacheType,
				commentId,
				memberIds,
			);
		}
	}

	/**
	 * 모든 댓글의 ID를 가져온다.
	 * @returns 모든 댓글의 ID
	 */
	private async getAllCommentIds(): Promise<string[]> {
		// 모든 댓글의 ID를 가져온다.
		return await this.commentsRepository.findAllCommentIds();
	}

	async getCommentsByFeedId(
		feedId: string,
		memberId: string,
	): Promise<CommentGetListsResDto[]> {
		const comment = await this.commentsRepository.getCommentsByFeedId(feedId);

		const mentionTypeId = await this.mentionsService.findMentionIdByMentionType(
			MENTION_ON_COMMENT,
		);

		// const newComments = await Promise.all(
		// 	comment.map(async (comment): Promise<CommentGetListsResDto> => {
		// 		const newChildComments = comment.childrenComments
		// 			? await Promise.all(
		// 					comment.childrenComments.map(
		// 						async (child): Promise<CommentGetListsResDto> => {
		// 							const { id, username } =
		// 								await this.commentsRepository.getUserIdAndNameByCommentId(
		// 									child.id,
		// 								);
		// 							const likedByComments =
		// 								await this.likesCommentRepository.getLikedByComments(
		// 									child.id,
		// 								);

		// 							return {
		// 								id: child.id,
		// 								commentContents: child.commentContents,
		// 								updatedAt: child.updatedAt,
		// 								replyId: child.replyId,
		// 								parentId: child.parentId,
		// 								feedId: child.feedId,
		// 								myLikeByComment: this.findMyLikeByComment(
		// 									likedByComments,
		// 									memberId,
		// 								),
		// 								sumLikeByComment: this.sumLikesOfComment(likedByComments),
		// 								member: {
		// 									id: id,
		// 									username: username,
		// 								},
		// 								mentions: await this.mentionsService.findMentionsByFeedId(
		// 									feedId,
		// 									mentionTypeId,
		// 									child.id,
		// 								),
		// 							};
		// 						},
		// 					),
		// 			  )
		// 			: [];

		// 		return {
		// 			id: comment.id,
		// 			commentContents: comment.commentContents,
		// 			updatedAt: comment.updatedAt,
		// 			replyId: comment.replyId,
		// 			parentId: comment.parentId,
		// 			feedId: comment.feedId,
		// 			myLikeByComment: this.findMyLikeByComment(
		// 				comment.LikedByComments,
		// 				memberId,
		// 			),
		// 			sumLikeByComment: this.sumLikesOfComment(comment.LikedByComments),
		// 			member: {
		// 				id: comment.member.id,
		// 				username: comment.member.username,
		// 			},
		// 			childrenComments: newChildComments,
		// 			mentions: await this.mentionsService.findMentionsByFeedId(
		// 				feedId,
		// 				mentionTypeId,
		// 				comment.id,
		// 			),
		// 		};
		// 	}),
		// );
		// return newComments;

		return await Promise.all(
			comment.map((comment) =>
				this.mapCommentToDto(comment, memberId, feedId, mentionTypeId),
			),
		);
	}

	private async mapCommentToDto(
		comment: CommentEntity,
		memberId: string,
		feedId: string,
		mentionTypeId: string,
	): Promise<CommentGetListsResDto> {
		const { id, username } =
			await this.commentsRepository.getUserIdAndNameByCommentId(comment.id);
		const likedByComments =
			await this.likesCommentRepository.getLikedByComments(comment.id);

		const childComments = comment.childrenComments
			? await Promise.all(
					comment.childrenComments.map((child) =>
						this.mapCommentToDto(child, memberId, feedId, mentionTypeId),
					),
			  )
			: [];

		return {
			id: comment.id,
			commentContents: comment.commentContents,
			updatedAt: comment.updatedAt,
			replyId: comment.replyId,
			parentId: comment.parentId,
			feedId: comment.feedId,
			myLikeByComment: this.findMyLikeByComment(likedByComments, memberId),
			sumLikeByComment: this.sumLikesOfComment(likedByComments),
			member: { id, username },
			childrenComments: childComments,
			mentions: await this.mentionsService.findMentionsByFeedId(
				feedId,
				mentionTypeId,
				comment.id,
			),
		};
	}

	private findMyLikeByComment(
		Likes: LikeCommentEntity[] | undefined,
		memberId: string,
	) {
		const index = Likes!.findIndex((v) => v.memberId === memberId);
		return index > -1 ? true : false;
	}

	private sumLikesOfComment(Likes: LikeCommentEntity[] | undefined) {
		const total = Likes?.reduce(
			(pre, current) => pre + (current.commentId ? 1 : 0),
			0,
		);

		return total ? total : 0;
	}

	async createComment(
		createCommentsArgs: ICreateCommentsArgs,
		qr?: QueryRunner,
	) {
		const newComment = this.commentsRepository.create({
			id: uuidv4(),
			...createCommentsArgs,
		});

		return await this.commentsRepository.createComment(newComment, qr);
	}

	async updateComment(
		commentId: string,
		commentContents: string,
		qr?: QueryRunner,
	) {
		return await this.commentsRepository.updateComment(
			commentId,
			commentContents,
			qr,
		);
	}

	async deleteComment(commentId: string, qr?: QueryRunner) {
		const deleteStatus = await this.commentsRepository.deleteComment(
			commentId,
			qr,
		);

		if (!deleteStatus) throw EntityConflictException(ERROR_DELETE_COMMENT);
	}

	async findCommentByIdOrThrow(commentId: string) {
		const comment = await this.commentsRepository.findOneBy({
			id: commentId,
		});

		if (!comment) {
			throw EntityNotFoundException(ERROR_COMMENT_NOT_FOUND);
		}

		return comment;
	}

	async commentExistsByCommentId(commentId: string) {
		return this.commentsRepository.exist({ where: { id: commentId } });
	}

	async isMineCommentExists(
		commentId: string,
		memberId: string,
	): Promise<boolean> {
		return this.commentsRepository.exist({
			where: {
				id: commentId,
				memberId,
			},
		});
	}

	async updateLikesCommentId(
		memberId: string,
		commentId: string,
		qrAndRedis: QueryRunnerWithRedis,
	): Promise<boolean> {
		const { queryRunner, redisMulti } = qrAndRedis;

		const hasLiked = await this.likesCache.hasLiked(
			this._likeCacheType,
			memberId,
			commentId,
		);

		if (hasLiked) {
			await this.likesCache.removeLike(
				this._likeCacheType,
				memberId,
				commentId,
				redisMulti,
			);
			await this.likesCommentRepository.removeLike(
				memberId,
				commentId,
				queryRunner,
			);
		} else {
			await this.likesCache.addLike(
				this._likeCacheType,
				memberId,
				commentId,
				redisMulti,
			);
			await this.likesCommentRepository.addLike(
				memberId,
				commentId,
				queryRunner,
			);
		}

		return !hasLiked;
	}
}
