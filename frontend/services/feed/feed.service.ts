import {
	CreateFeedRequest,
	UpdateFeedRequest,
} from '@/components/ui/modal/layer-modal/layer/CreateFeed/create-feed.interface';

import {
	FeedByIdResponse,
	FeedInfo,
	FeedsResponse,
} from '@/shared/interfaces/feed.interface';

import { axiosAPI } from 'api/axios';

export function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export const FeedService = {
	async getFeeds(page: number, options: 'TOP' | 'MYFEED' | 'ALL' = 'TOP') {
		const { data } = await axiosAPI.get<FeedsResponse>(
			`/feeds?page=${page}&options=${options}`,
		);

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

	async updateFeed({
		contents,
		isPublic,
		groupId,
		medias,
		feedId,
	}: UpdateFeedRequest) {
		const { data } = await axiosAPI.put<FeedByIdResponse>(`/feeds/${feedId}`, {
			contents: contents,
			isPublic: isPublic,
			groupId: groupId,
			medias: medias,
		});

		return data;
	},

	async updateLike(feedId: string) {
		const { data } = await axiosAPI.put(`/feeds/${feedId}/likes`);

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
