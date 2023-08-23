import { MemberEntity } from '@/entities/member.entity';
import { PickType } from '@nestjs/swagger';

export class VerifyEmailDto extends PickType(MemberEntity, [
	'email',
	'signupVerifyToken',
] as const) {}
