import { MemberEntity } from '@/models/entities/member.entity';
import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class VerifyEmailReqDto extends PickType(MemberEntity, [
	'email',
] as const) {
	@ApiProperty({
		description: '이메일 인증을 위한 코드',
		example: '468DvYlW5D',
	})
	@IsString()
	@IsNotEmpty()
	@MaxLength(10)
	@MinLength(10)
	signupVerifyToken!: string;
}
