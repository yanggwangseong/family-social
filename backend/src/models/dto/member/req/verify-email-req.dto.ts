import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

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
	@IsNotEmpty()
	@MaxLength(10)
	@MinLength(10)
	signupVerifyToken!: string;
}
