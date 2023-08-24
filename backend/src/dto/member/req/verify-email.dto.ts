import { MemberEntity } from '@/entities/member.entity';
import { ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class VerifyEmailDto extends PickType(MemberEntity, ['email'] as const) {
	@ApiPropertyOptional({
		description: '이메일 인증을 위한 코드',
		example: '468DvYlW5D',
	})
	@IsString()
	@IsNotEmpty()
	@MaxLength(10)
	@MinLength(10)
	signupVerifyToken!: string;
}
