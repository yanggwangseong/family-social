import { CommentService } from '@/services/comment/comment.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useCreateMutation } from './useCreateMutation';

export const useCommentLike = ({
	handleRefetch,
	handleIsLottie,
}: {
	handleRefetch: (pageValue: number) => void;
	handleIsLottie: (status: boolean) => void;
}) => {
	const { mutate: commentLikeSync } = useCreateMutation(
		async (data: { feedId: string; commentId: string; page: number }) =>
			await CommentService.updateLike(data.feedId, data.commentId),
		{
			mutationKey: ['comment-like'],
			onMutate: () => {},
			onSuccess: (data, variable) => {
				const pageValue = variable.page;

				if (data) {
					handleIsLottie(true);
					Notify.success('좋아요를 누르셨습니다');
				} else {
					Notify.warning('좋아요를 취소하셨습니다');
				}
				handleRefetch(pageValue);
			},
		},
	);

	const handleLikeComment = (
		feedId: string,
		commentId: string,
		page: number,
	) => {
		commentLikeSync({ feedId, commentId, page });
	};

	return { handleLikeComment };
};
