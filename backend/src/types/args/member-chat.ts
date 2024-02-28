import { ChatEntity } from '@/models/entities/chat.entity';
import { MemberChatEntity } from '@/models/entities/member-chat.entity';

export interface IGetMemberBelongToChatsRes
	extends Pick<MemberChatEntity, 'memberId'> {
	chat: Pick<ChatEntity, 'id' | 'createdAt'>;
}
