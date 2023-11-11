import { MemberEntity } from '@/models/entities/member.entity';
import { PickType } from '@nestjs/swagger';

export class MemberUpdateReqDto extends PickType(MemberEntity, [
	'username',
	'phoneNumber',
	'profileImage',
] as const) {}
