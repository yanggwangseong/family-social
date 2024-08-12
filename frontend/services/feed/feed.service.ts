import {
	CreateFeedRequest,
	FeedLikeUpdateRequest,
	UpdateFeedRequest,
} from '@/components/ui/modal/layer-modal/layer/CreateFeed/create-feed.interface';

import { FeedByIdResponse, FeedInfo } from '@/shared/interfaces/feed.interface';
import { BasicPaginationResponse } from '@/shared/interfaces/pagination.interface';

import { axiosAPI } from 'api/axios';
import { OmitStrict } from 'types';

export function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export const FeedService = {
	async getFeeds(
		page: number,
		options: 'TOP' | 'MYFEED' | 'ALL' | 'GROUPFEED' = 'TOP',
		groupId?: string,
	) {
		let endPoint = `/feeds?page=${page}&options=${options}`;
		if (groupId) endPoint += `&groupId=${groupId}`;

		const { data } = await axiosAPI.get<BasicPaginationResponse<FeedInfo>>(
			endPoint,
		);

		return data;
	},

	async createFeed(createFeedRequest: CreateFeedRequest) {
		const { data } = await axiosAPI.post<FeedByIdResponse>(`/feeds`, {
			...createFeedRequest,
		} satisfies CreateFeedRequest);

		return data;
	},

	async updateFeed({ feedId, ...rest }: UpdateFeedRequest) {
		const { data } = await axiosAPI.put<FeedByIdResponse>(`/feeds/${feedId}`, {
			...rest,
		} satisfies OmitStrict<UpdateFeedRequest, 'feedId'>);

		return data;
	},

	async updateLike(feedId: string, feedWriterId: string) {
		const { data } = await axiosAPI.put(`/feeds/${feedId}/likes`, {
			feedWriterId,
		} satisfies FeedLikeUpdateRequest);

		return data;
	},

	async deleteFeed(feedId: string) {
		const { data } = await axiosAPI.delete<FeedByIdResponse>(
			`/feeds/${feedId}`,
		);

		return data;
	},

	async getFeedById(feedId: string) {
		const { data } = await axiosAPI.get<FeedInfo>(`/feeds/${feedId}`);

		return data;
	},
};
