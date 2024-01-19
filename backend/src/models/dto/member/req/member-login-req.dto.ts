import { PickType } from '@nestjs/swagger';

import { MemberEntity } from '@/models/entities/member.entity';

export class MemberLoginReqDto extends PickType(MemberEntity, [
	'email',
	'password',
] as const) {}
