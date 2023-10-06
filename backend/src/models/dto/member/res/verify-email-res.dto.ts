import { MemberEntity } from '@/models/entities/member.entity';
import { PickType } from '@nestjs/swagger';

export class VerifyEmailResDto extends PickType(MemberEntity, [
	'username',
	'signupVerifyToken',
] as const) {}
