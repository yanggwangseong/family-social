import { ApiProperty, PickType } from '@nestjs/swagger';

import { MessageEntity } from '@/models/entities/message.entity';

export class RecentMessageResDto extends PickType(MessageEntity, [
	'id',
	'createdAt',
	'chatId',
	'memberId',
	'message',
] as const) {
	@ApiProperty({
		nullable: false,
		description: '최신 메세지의 멤버 이름',
	})
	memberName!: string;

	@ApiProperty({
		nullable: false,
		description: '최신 메세지의 멤버 이메일',
	})
	memberEmail!: string;

	@ApiProperty({
		nullable: false,
		description: '최신 메세지의 멤버 프로필 이미지',
	})
	memberProfileImage!: string;
}
