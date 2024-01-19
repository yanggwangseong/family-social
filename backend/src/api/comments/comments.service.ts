import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import {
	EntityConflictException,
	EntityNotFoundException,
} from '@/common/exception/service.exception';
import {
	ERROR_COMMENT_NOT_FOUND,
	ERROR_DELETE_COMMENT,
} from '@/constants/business-error';
import { CommentGetListsResDto } from '@/models/dto/comments/res/comment-get-lists-res.dto';
import { LikeCommentEntity } from '@/models/entities/fam-like-comment.entity';
import { CommentsRepository } from '@/models/repositories/comments.repository';
import { LikesCommentRepository } from '@/models/repositories/likes-comment.repository';
import { ICreateCommentsArgs } from '@/types/args/comment';

@Injectable()
export class CommentsService {
	constructor(
		private readonly commentsRepository: CommentsRepository,
		private readonly likesCommentRepository: LikesCommentRepository,
		private dataSource: DataSource,
	) {}

	async getCommentsByFeedId(
		feedId: string,
		memberId: string,
	): Promise<CommentGetListsResDto[]> {
		const comment = await this.commentsRepository.getCommentsByFeedId(feedId);

		const newComments = await Promise.all(
			comment.map(async (comment): Promise<CommentGetListsResDto> => {
				const newChildComments = comment.childrenComments
					? await Promise.all(
							comment.childrenComments.map(
								async (child): Promise<CommentGetListsResDto> => {
									const { id, username } =
										await this.commentsRepository.getUserIdAndNameByCommentId(
											child.id,
										);
									const likedByComments =
										await this.likesCommentRepository.getLikedByComments(
											child.id,
										);

									return {
										id: child.id,
										commentContents: child.commentContents,
										updatedAt: child.updatedAt,
										replyId: child.replyId,
										parentId: child.parentId,
										feedId: child.feedId,
										myLikeByComment: this.findMyLikeByComment(
											likedByComments,
											memberId,
										),
										sumLikeByComment: this.sumLikesOfComment(likedByComments),
										member: {
											id: id,
											username: username,
										},
									};
								},
							),
					  )
					: undefined;

				return {
					id: comment.id,
					commentContents: comment.commentContents,
					updatedAt: comment.updatedAt,
					replyId: comment.replyId,
					parentId: comment.parentId,
					feedId: comment.feedId,
					myLikeByComment: this.findMyLikeByComment(
						comment.LikedByComments,
						memberId,
					),
					sumLikeByComment: this.sumLikesOfComment(comment.LikedByComments),
					member: {
						id: comment.member.id,
						username: comment.member.username,
					},
					childrenComments: newChildComments,
				};
			}),
		);
		return newComments;
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

		if (!comment) {
			throw EntityNotFoundException(ERROR_COMMENT_NOT_FOUND);
		}

		return comment;
	}

	async updateLikesCommentId(
		memberId: string,
		commentId: string,
	): Promise<boolean> {
		// 댓글이 있는지 확인.
		await this.findCommentByIdOrThrow(commentId);

		const like = await this.likesCommentRepository.findMemberLikesComment(
			memberId,
			commentId,
		);

		if (like) {
			await this.likesCommentRepository.remove(like);
		} else {
			await this.likesCommentRepository.save({ memberId, commentId });
		}

		return !like;
	}
}
