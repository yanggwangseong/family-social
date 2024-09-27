import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsUUID } from 'class-validator';

import { isInValidationMessage } from '@/common/validation-message/is-in-validation-message';
import { uuidValidationMessage } from '@/common/validation-message/uuid-validation-message';
import { ChatType, Union } from '@/types';

export class ChatCreateReqDto {
	@ApiProperty({
		description: '채팅 참여자 ID 목록',
		example: ['123e4567-e89b-12d3-a456-426614174000'],
	})
	@IsUUID(4, { each: true, message: uuidValidationMessage })
	memberIds!: string[];

	@ApiProperty({
		description: '채팅 타입',
		example: 'GROUP',
	})
	@IsIn(ChatType, { message: isInValidationMessage })
	chatType!: Union<typeof ChatType>;
}
