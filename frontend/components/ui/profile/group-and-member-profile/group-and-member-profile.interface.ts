import { ChatListResponse } from '@/shared/interfaces/chat.interface';
import { GroupProfileResponse } from '@/shared/interfaces/group.interface';
import { SearchMemberResponse } from '@/shared/interfaces/member.interface';

export interface GroupAndMemberProfileProps {
	member: SearchMemberResponse;
	group: GroupProfileResponse;
	chat?: ChatListResponse;
}
