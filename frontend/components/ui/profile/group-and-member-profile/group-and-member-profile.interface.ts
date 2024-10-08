import { ChatListResponse } from '@/shared/interfaces/chat.interface';
import { GroupProfileResponse } from '@/shared/interfaces/group.interface';

export interface GroupAndMemberProfileProps {
	username: string;
	groupName: string;
	group: GroupProfileResponse;
	chat?: ChatListResponse;
}
