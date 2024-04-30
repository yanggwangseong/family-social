import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

import { uuidValidationMessage } from '@/common/validation-message/uuid-validation-message';

export class MentionCreateReqDto {
	@ApiProperty()
	@IsUUID(4, { message: uuidValidationMessage })
	mentionMemberId!: string;
}
