import { PickType } from '@nestjs/swagger';

import { MemberEntity } from '@/models/entities/member.entity';

export class VerifyEmailResDto extends PickType(MemberEntity, [
	'username',
	'signupVerifyToken',
] as const) {}
