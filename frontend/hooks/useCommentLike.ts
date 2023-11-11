import { CommentService } from '@/services/comment/comment.service';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const useCommentLike = ({
	handleRefetch,
	handleIsLottie,
}: {
	handleRefetch: (pageValue: number) => void;
	handleIsLottie: (status: boolean) => void;
}) => {
	const { mutate: commentLikeSync } = useMutation(
		['comment-like'],
		(data: { feedId: string; commentId: string; page: number }) =>
			CommentService.updateLike(data.feedId, data.commentId),
		{
			onMutate: variable => {
				//Loading.hourglass();
			},
			onSuccess(data, variable) {
				const pageValue = variable.page;
				if (data === true) {
					handleIsLottie(true);
					Notify.success('좋아요를 누르셨습니다');
				}
				if (data === false) {
					Notify.warning('좋아요를 취소하셨습니다');
				}

				handleRefetch(pageValue);
				//refetch({ refetchPage: (page, index) => index === pageValue - 1 });

				//Loading.remove();
				//if (data) Report.success('성공', `좋아요를 성공 하였습니다`, '확인');
				//Report.success('성공', `좋아요를 취소 하였습니다`, '확인');
			},
			onError(error) {
				if (axios.isAxiosError(error)) {
					Report.warning(
						'실패',
						`${error.response?.data.message}`,
						'확인',
						() => Loading.remove(),
					);
				}
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
