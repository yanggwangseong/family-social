import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

import { uuidValidationMessage } from '@/common/validation-message/uuid-validation-message';

export class ChatCreateReqDto {
	@ApiProperty()
	@IsUUID(4, { each: true, message: uuidValidationMessage })
	memberIds!: string[];
}
