import { PickType } from '@nestjs/swagger';

import { MemberEntity } from '@/models/entities/member.entity';

export class MemberUpdateReqDto extends PickType(MemberEntity, [
	'username',
	'phoneNumber',
	'profileImage',
] as const) {}
