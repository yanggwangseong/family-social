import { PickType } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

import { uuidValidationMessage } from '@/common/validation-message/uuid-validation-message';
import { MessageEntity } from '@/models/entities/message.entity';

export class MessageCreateReqDto extends PickType(MessageEntity, [
	'message',
] as const) {
	@IsUUID(4, { message: uuidValidationMessage })
	chatId!: string;
}
