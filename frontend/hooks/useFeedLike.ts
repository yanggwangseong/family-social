import { FeedService } from '@/services/feed/feed.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useCreateMutation } from './useCreateMutation';

export const useFeedLike = ({
	handleRefetch,
	handleIsLottie,
}: {
	handleRefetch: (pageValue: number) => void;
	handleIsLottie: (status: boolean) => void;
}) => {
	const { mutate: feedLikeSync } = useCreateMutation(
		async (data: { feedId: string; page: number; feedWriterId: string }) =>
			await FeedService.updateLike(data.feedId, data.feedWriterId),
		{
			mutationKey: ['feed-like'],
			onMutate: variable => {},
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

	const handleUpdateLike = (
		feedId: string,
		page: number,
		feedWriterId: string,
	) => {
		feedLikeSync({ feedId, page, feedWriterId });
	};

	return { handleUpdateLike };
};
