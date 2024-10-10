import { CommentsResponse } from './comment.interface';
import { MediaInfo } from './media.interface';
import { MentionsResponse } from './mention.interface';

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
	groupDescription: string;
	groupCoverImage: string;
	memberId: string;
	username: string;
	profileImage: string;
	email: string;
	myLike?: boolean;
	sumLike?: number;
	sumComment?: number;
	medias: MediaInfo[];
	comments: CommentsResponse[];
	mentions: MentionsResponse[];
}

export interface FeedByIdResponse {
	id: string;
	isPublic: boolean;
}
