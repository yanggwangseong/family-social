import { ApiProperty, PickType } from '@nestjs/swagger';

import { MessageEntity } from '@/models/entities/message.entity';

import { MemberSearchResDto } from '../../member/res/member-search-res.dto';

export class MessagesByChatResDto extends PickType(MessageEntity, [
	'id',
	'createdAt',
	'updatedAt',
	'message',
] as const) {
	@ApiProperty({
		nullable: false,
	})
	isMine!: boolean;

	@ApiProperty({
		nullable: false,
	})
	member!: MemberSearchResDto;
}
