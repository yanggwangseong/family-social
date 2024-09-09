import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';

export class InvitationValidationCodeReqDto {
	@ApiProperty({
		nullable: false,
		description: '초대 인증 코드',
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	inviteCode!: string;
}
