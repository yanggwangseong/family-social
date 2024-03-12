import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

import { lengthValidationMessage } from '@/common/validation-message/length-validation-message';
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
	@Length(10, 10, { message: lengthValidationMessage })
	signupVerifyToken!: string;
}
