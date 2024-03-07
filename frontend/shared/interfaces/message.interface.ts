import { MembersResponse } from './member.interface';

export interface GetMessagesResponse {
	list: MessageItemResponse[];
}

export interface MessageItemResponse {
	id: string;
	createdAt: string;
	updatedAt: string;
	message: string;
	isMine: boolean;
	member: MembersResponse;
}
