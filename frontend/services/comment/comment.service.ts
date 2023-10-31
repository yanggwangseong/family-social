import { CreateCommentRequest } from '@/components/ui/feed/comment/comments-interface';
import { axiosAPI } from 'api/axios';

export const CommentService = {
	async createComment({
		commentContents,
		feedId,
		replyId,
		parentId,
	}: CreateCommentRequest) {
		const { data } = await axiosAPI.post<void>(`/feeds/${feedId}/comments`, {
			commentContents: commentContents,
			feedId: feedId,
			replyId: replyId,
			parentId: parentId,
		});

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
};
