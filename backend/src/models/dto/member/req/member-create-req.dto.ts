import { PickType } from '@nestjs/swagger';

import { MemberEntity } from '@/models/entities/member.entity';

export class MemberCreateReqDto extends PickType(MemberEntity, [
	'email',
	'username',
	'password',
	'phoneNumber',
] as const) {}
