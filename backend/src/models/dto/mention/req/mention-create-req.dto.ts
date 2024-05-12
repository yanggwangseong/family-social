import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

import { uuidValidationMessage } from '@/common/validation-message/uuid-validation-message';
import { MentionEntity } from '@/models/entities/mention.entity';

export class MentionCreateReqDto extends PickType(MentionEntity, [
	'mentionPosition',
] as const) {
	@ApiProperty()
	@IsUUID(4, { message: uuidValidationMessage })
	mentionMemberId!: string;
}
