import { PickType } from '@nestjs/swagger';

import { MemberEntity } from '@/models/entities/member.entity';

export class MemberSearchResDto extends PickType(MemberEntity, [
	'username',
	'id',
	'profileImage',
	'email',
] as const) {}
