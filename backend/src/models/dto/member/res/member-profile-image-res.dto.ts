import { PickType } from '@nestjs/swagger';

import { MemberEntity } from '@/models/entities/member.entity';

export class MemberProfileImageResDto extends PickType(MemberEntity, [
	'username',
	'id',
	'profileImage',
] as const) {}
