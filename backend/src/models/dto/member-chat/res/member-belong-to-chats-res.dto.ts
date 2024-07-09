import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { CreatedAtResDecorator } from '@/common/decorators/entity/created-at-res.decorator';

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

	@CreatedAtResDecorator()
	chatCreateAt!: string;

	@ApiProperty({
		nullable: false,
		type: [ChatMembersResDto],
	})
	@Type(() => ChatMembersResDto)
	chatMembers!: ChatMembersResDto[];

	@ApiProperty({
		nullable: false,
	})
	joinMemberCount!: number;

	@ApiProperty({
		nullable: false,
	})
	@Type(() => RecentMessageResDto)
	recentMessage!: RecentMessageResDto;
}
