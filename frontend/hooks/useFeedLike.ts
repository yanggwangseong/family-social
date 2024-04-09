import { FeedService } from '@/services/feed/feed.service';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const useFeedLike = ({
	handleRefetch,
	handleIsLottie,
}: {
	handleRefetch: (pageValue: number) => void;
	handleIsLottie: (status: boolean) => void;
}) => {
	const { mutate: feedLikeSync } = useMutation(
		['feed-like'],
		(data: { feedId: string; page: number; feedWriterId: string }) =>
			FeedService.updateLike(data.feedId, data.feedWriterId),
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

	const handleUpdateLike = (
		feedId: string,
		page: number,
		feedWriterId: string,
	) => {
		feedLikeSync({ feedId, page, feedWriterId });
	};

	return { handleUpdateLike };
};
