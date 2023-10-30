import { CreateCommentRequest } from '@/components/ui/feed/comment/comments-interface';
import { axiosAPI } from 'api/axios';

export const CommentService = {
	async createComment({
		commentContents,
		feedId,
		replyId,
		parentId,
	}: CreateCommentRequest) {
		console.log(replyId);
		console.log(parentId);
		const { data } = await axiosAPI.post<void>(`/feeds/${feedId}/comments`, {
			commentContents: commentContents,
			feedId: feedId,
			replyId: replyId,
			parentId: parentId,
		});

		return data;
	},
};
