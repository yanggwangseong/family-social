import { PickType } from '@nestjs/swagger';

import { MemberEntity } from '@/models/entities/member.entity';

export class MemberByIdResDto extends PickType(MemberEntity, [
	'username',
	'id',
	'profileImage',
	'socialType',
] as const) {}
