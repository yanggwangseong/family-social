import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { MemberBelongToChatsResDto } from '../../member-chat/res/member-belong-to-chats-res.dto';

export class GetChatListResDto {
	@ApiProperty({
		nullable: false,
		type: [MemberBelongToChatsResDto],
	})
	@Type(() => MemberBelongToChatsResDto)
	list!: MemberBelongToChatsResDto[];
}
