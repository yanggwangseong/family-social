import { PickType } from '@nestjs/swagger';

import { MemberEntity } from '@/models/entities/member.entity';

export class MemberSocialCreateReqDto extends PickType(MemberEntity, [
	'id',
	'profileImage',
	'username',
	'phoneNumber',
] as const) {}
