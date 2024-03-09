import { IsUUID } from 'class-validator';

import { uuidValidationMessage } from '@/common/validation-message/uuid-validation-message';

export class ChatEnterReqDto {
	@IsUUID(4, { each: true, message: uuidValidationMessage })
	chatIds!: string[];
}
