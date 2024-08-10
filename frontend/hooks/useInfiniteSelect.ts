import { FeedsResponse } from '@/shared/interfaces/feed.interface';
import { GroupEventItemResponse } from '@/shared/interfaces/group-event.interface';
import { NotificationItem } from '@/shared/interfaces/notification.interface';
import { BasicPaginationResponse } from '@/shared/interfaces/pagination.interface';
import { GetScheduleListResponse } from '@/shared/interfaces/schedule.interface';
import { useState } from 'react';
import { QueryFunction, useInfiniteQuery } from 'react-query';

export interface InfiniteOverrideOptions {
	enabled?: boolean;
}
export const useInfiniteSelect = <
	T extends
		| GetScheduleListResponse
		| FeedsResponse
		| BasicPaginationResponse<GroupEventItemResponse>
		| BasicPaginationResponse<NotificationItem>,
>(
	queryKey: string[],
	queryFn: QueryFunction<T, string[]>,
	overridOptions?: InfiniteOverrideOptions,
) => {
	return useInfiniteQuery(queryKey, queryFn, {
		getNextPageParam: (lastPage, allPosts) => {
			return lastPage.page !== allPosts[0].totalPage
				? lastPage.page + 1
				: undefined;
		},
		...overridOptions,
	});
};
