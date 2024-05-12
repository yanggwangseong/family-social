import { FeedsResponse } from '@/shared/interfaces/feed.interface';
import { GetScheduleListResponse } from '@/shared/interfaces/schedule.interface';
import { useState } from 'react';
import { QueryFunction, useInfiniteQuery } from 'react-query';

export const useInfiniteSelect = <
	T extends GetScheduleListResponse | FeedsResponse,
>(
	queryKey: string[],
	queryFn: QueryFunction<T, string[]>,
) => {
	return useInfiniteQuery(queryKey, queryFn, {
		getNextPageParam: (lastPage, allPosts) => {
			return lastPage.page !== allPosts[0].totalPage
				? lastPage.page + 1
				: undefined;
		},
	});
};
