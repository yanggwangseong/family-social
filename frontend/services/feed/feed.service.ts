import { CreateFeedRequest } from '@/components/ui/modal/layer-modal/layer/CreateFeed/create-feed.interface';
import {
	FeedByIdResponse,
	FeedInfo,
	FeedsResponse,
} from '@/shared/interfaces/feed.interface';
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

	async createFeed({ contents, isPublic, groupId, medias }: CreateFeedRequest) {
		const { data } = await axiosAPI.post<FeedByIdResponse>(`/feeds`, {
			contents: contents,
			isPublic: isPublic,
			groupId: groupId,
			medias: medias,
		});

		return data;
	},

	async getFeedById(feedId: string) {
		const { data } = await axiosAPI.get<FeedInfo>(`/feeds/${feedId}`);

		return data;
	},
};
