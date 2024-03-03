import { MembersResponse } from './member.interface';

export interface ChatListResponse {
	targetMemberId: string;
	chatId: string;
	chatCreateAt: string;
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
}
