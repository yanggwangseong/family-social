import { MediaInfo } from './media.interface';

export interface FeedsResponse {
	list: FeedInfo[];
	page: number;
	totalPage: number;
}

export interface FeedInfo {
	feedId: string;
	contents: string;
	isPublic: boolean;
	groupId: string;
	groupName: string;
	memberId: string;
	username: string;
	medias: MediaInfo[];
}

export interface FeedByIdResponse {
	id: string;
	isPublic: boolean;
}
