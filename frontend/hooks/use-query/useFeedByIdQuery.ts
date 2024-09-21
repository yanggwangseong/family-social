import { FeedService } from '@/services/feed/feed.service';
import { FeedInfo } from '@/shared/interfaces/feed.interface';
import { useQuery, UseQueryOptions } from 'react-query';

export interface UseFeedByIdQueryOptions
	extends Omit<
		UseQueryOptions<FeedInfo, unknown, FeedInfo, string[]>,
		'queryKey' | 'queryFn'
	> {}
export const useFeedByIdQuery = (
	isFeedId: string,
	options?: UseFeedByIdQueryOptions,
) => {
	const {
		data: feed,
		isLoading: feddLoading,
		...rest
	} = useQuery(
		['get-feed-by-id', isFeedId],
		async () => await FeedService.getFeedById(isFeedId),
		{
			...options,
		},
	);

	return {
		feed,
		feddLoading,
		...rest,
	};
};
