import { ChatListResponse } from '@/shared/interfaces/chat.interface';

export interface GroupAndMemberProfileProps {
	username: string;
	groupName: string;
	chat?: ChatListResponse;
}
