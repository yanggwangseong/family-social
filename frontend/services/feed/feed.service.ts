import { FeedsResponse } from '@/shared/interfaces/feed.interface';
import { axiosAPI } from 'api/axios';

export const FeedService = {
	async getFeeds(page: number) {
		const { data } = await axiosAPI.get<FeedsResponse>(`/feeds?page=${page}`);

		return data;
	},
};
