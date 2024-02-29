import { PickType } from '@nestjs/swagger';

import { MessageEntity } from '@/models/entities/message.entity';

export class RecentMessageResDto extends PickType(MessageEntity, [
	'id',
	'createdAt',
	'chatId',
	'memberId',
	'message',
] as const) {}
