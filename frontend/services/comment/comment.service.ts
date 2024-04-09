import { CreateCommentRequest } from '@/components/ui/feed/comment/comments-interface';
import { axiosAPI } from 'api/axios';

export const CommentService = {
	async createComment({
		commentContents,
		feedId,
		replyId,
		parentId,
		feedWriterId,
	}: CreateCommentRequest) {
		const { data } = await axiosAPI.post<void>(`/feeds/${feedId}/comments`, {
			commentContents: commentContents,
			feedId,
			replyId,
			parentId,
			feedWriterId,
		});

		return data;
	},

	async updateComment({
		feedId,
		commentId,
		commentContents,
	}: {
		feedId: string;
		commentId?: string;
		commentContents: string;
	}) {
		const { data } = await axiosAPI.put<void>(
			`/feeds/${feedId}/comments/${commentId}`,
			{
				commentContents: commentContents,
			},
		);

		return data;
	},

	async deleteComment({
		feedId,
		commentId,
	}: {
		feedId: string;
		commentId: string;
	}) {
		const { data } = await axiosAPI.delete<void>(
			`/feeds/${feedId}/comments/${commentId}`,
		);

		return data;
	},

	async updateLike(feedId: string, commentId: string) {
		const { data } = await axiosAPI.put(
			`/feeds/${feedId}/comments/${commentId}/likes`,
		);

		return data;
	},
};
