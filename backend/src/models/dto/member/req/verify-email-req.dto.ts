import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

import { maxLengthValidationMessage } from '@/common/validation-message/max-length-validation-message';
import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { stringValidationMessage } from '@/common/validation-message/string-validation-message';
import { MemberEntity } from '@/models/entities/member.entity';

export class VerifyEmailReqDto extends PickType(MemberEntity, [
	'email',
] as const) {
	@ApiProperty({
		description: '이메일 인증을 위한 코드',
		example: '468DvYlW5D',
	})
	@IsString({
		message: stringValidationMessage,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@MaxLength(10, { message: maxLengthValidationMessage })
	@MinLength(10)
	signupVerifyToken!: string;
}
