import { ApiProperty } from '@nestjs/swagger';

import { ChatMembersResDto } from './chat-members-res.dto';
import { RecentMessageResDto } from '../../message/res/recent-message-res.dto';

export class MemberBelongToChatsResDto {
	@ApiProperty({
		nullable: false,
	})
	targetMemberId!: string;

	@ApiProperty({
		nullable: false,
	})
	chatId!: string;

	@ApiProperty({
		nullable: false,
	})
	chatCreateAt!: string;

	@ApiProperty({
		nullable: false,
		type: [ChatMembersResDto],
	})
	chatMembers!: ChatMembersResDto[];

	@ApiProperty({
		nullable: false,
	})
	joinMemberCount!: number;

	@ApiProperty({
		nullable: false,
	})
	recentMessage!: RecentMessageResDto;
}
