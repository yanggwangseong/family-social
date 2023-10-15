import { FeedsResponse } from '@/shared/interfaces/feed.interface';
import { axiosAPI } from 'api/axios';

function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export const FeedService = {
	async getFeeds(page: number) {
		await sleep(3000);
		const { data } = await axiosAPI.get<FeedsResponse>(`/feeds?page=${page}`);

		return data;
	},
};
