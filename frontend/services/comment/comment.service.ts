import { CreateCommentRequest } from '@/components/ui/feed/comment/comments-interface';
import { CreateMentionRequest } from '@/components/ui/form/comment-form.interface';
import {
	CreateCommentRequestBody,
	DeleteCommentArgs,
	UpdateCommentArgs,
	UpdateCommentRequest,
} from '@/shared/interfaces/comment.interface';
import { axiosAPI } from 'api/axios';

export const CommentService = {
	async createComment({ feedId, ...rest }: CreateCommentRequest) {
		const { data } = await axiosAPI.post<void>(`/feeds/${feedId}/comments`, {
			...rest,
		} satisfies CreateCommentRequestBody);

		return data;
	},

	async updateComment({ feedId, commentId, ...rest }: UpdateCommentArgs) {
		const { data } = await axiosAPI.put<void>(
			`/feeds/${feedId}/comments/${commentId}`,
			{
				...rest,
			} satisfies UpdateCommentRequest,
		);

		return data;
	},

	async deleteComment({ feedId, commentId }: DeleteCommentArgs) {
		const { data } = await axiosAPI.delete<void>(
			`/feeds/${feedId}/comments/${commentId}`,
		);

		return data;
	},

	async updateLike(feedId: string, commentId: string): Promise<boolean> {
		const { data } = await axiosAPI.put(
			`/feeds/${feedId}/comments/${commentId}/likes`,
		);

		return data;
	},
};
