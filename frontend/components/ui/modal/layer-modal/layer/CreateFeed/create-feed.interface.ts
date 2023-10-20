export interface CreateFeedFields {
	contents: string;
	isPublic: string;
}

export interface CreateMediaType {
	url: string;
	position: number;
}

export interface CreateFeedRequest {
	contents: string;
	isPublic: boolean;
	groupId: string;
	medias: CreateMediaType[];
}
