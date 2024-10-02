import { ApiProperty } from '@nestjs/swagger';
import {
	ArrayMaxSize,
	ArrayMinSize,
	IsIn,
	IsUUID,
	ValidateIf,
} from 'class-validator';

import { arrayMaxSizeValidationMessage } from '@/common/validation-message/array-max-size-validation';
import { arrayMinSizeValidationMessage } from '@/common/validation-message/array-min-size-validation-message';
import { isInValidationMessage } from '@/common/validation-message/is-in-validation-message';
import { uuidValidationMessage } from '@/common/validation-message/uuid-validation-message';
import { ChatType, Union } from '@/types';

export class ChatCreateReqDto {
	@ApiProperty({
		description: '채팅 참여자 ID 목록',
		example: ['123e4567-e89b-12d3-a456-426614174000'],
	})
	@IsUUID(4, { each: true, message: uuidValidationMessage })
	@ArrayMinSize(1, { message: arrayMinSizeValidationMessage })
	@ArrayMaxSize(20, { message: arrayMaxSizeValidationMessage })
	memberIds!: string[];

	@ApiProperty({
		description: '채팅 타입',
		example: 'GROUP',
	})
	@IsIn(ChatType, { message: isInValidationMessage })
	chatType!: Union<typeof ChatType>;

	@ApiProperty({
		description: '그룹 아이디',
		example: '123e4567-e89b-12d3-a456-426614174000',
	})
	@IsUUID(4, { message: uuidValidationMessage })
	@ValidateIf((o) => o.chatType === 'GROUP')
	groupId?: string;
}
