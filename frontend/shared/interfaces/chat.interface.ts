import { ChatType, Union } from 'types';
import { MembersResponse } from './member.interface';
import { GroupProfileResponse } from './group.interface';

export interface GetChatsResponse {
	list: ChatListResponse[];
}

export interface ChatListResponse {
	targetMemberId: string;
	chatId: string;
	chatCreateAt: string;
	chatType: Union<typeof ChatType>;
	group?: GroupProfileResponse;
	joinMemberCount: number;
	chatMembers: ChatMemberResponse[];
	recentMessage: RecentMessageResponse;
}

export interface ChatMemberResponse {
	memberId: string;
	member: MembersResponse;
}

export interface RecentMessageResponse {
	id: string;
	createdAt: string;
	chatId: string;
	memberId: string;
	message: string;
	memberName: string;
}

export interface CreateChatRequest {
	memberIds: string[];
	chatType: Union<typeof ChatType>;
	groupId?: string;
}
