import { CreateMentionRequest } from '@/components/ui/form/comment-form.interface';

export interface CreateFeedFields {
	contents: string;
}

export interface CreateMediaType {
	url: string;
	position: number;
}

export interface CreateFeedRequest {
	contents: string;
	isPublic: boolean;
	isVisibleToFollowers: boolean;
	groupId: string;
	medias: CreateMediaType[];
	mentions: CreateMentionRequest[];
}

export interface UpdateFeedRequest extends CreateFeedRequest {
	feedId: string;
}

export interface FeedLikeUpdateRequest {
	feedWriterId: string;
}
