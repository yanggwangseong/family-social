import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { CreatedAtResDecorator } from '@/common/decorators/entity/created-at-res.decorator';

import { ChatMembersResDto } from './chat-members-res.dto';
import { RecentMessageResDto } from '../../message/res/recent-message-res.dto';

export class MemberBelongToChatsResDto {
	@ApiProperty({
		nullable: false,
		description: '대상 유저 아이디',
	})
	targetMemberId!: string;

	@ApiProperty({
		nullable: false,
		description: '채팅방 아이디',
	})
	chatId!: string;

	@CreatedAtResDecorator()
	chatCreateAt!: Date;

	@ApiProperty({
		nullable: false,
		type: [ChatMembersResDto],
	})
	@Type(() => ChatMembersResDto)
	chatMembers!: ChatMembersResDto[];

	@ApiProperty({
		nullable: false,
		description: '참여 멤버 수',
	})
	joinMemberCount!: number;

	@ApiProperty({
		nullable: false,
	})
	@Type(() => RecentMessageResDto)
	recentMessage!: RecentMessageResDto;
}
