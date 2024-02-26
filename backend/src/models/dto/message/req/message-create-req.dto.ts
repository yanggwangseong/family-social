import { PickType } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

import { MessageEntity } from '@/models/entities/message.entity';

export class MessageCreateReqDto extends PickType(MessageEntity, [
	'message',
] as const) {
	@IsUUID(4)
	chatId!: string;
}
