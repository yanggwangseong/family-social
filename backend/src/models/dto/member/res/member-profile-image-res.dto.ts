import { MemberEntity } from '@/models/entities/member.entity';
import { PickType } from '@nestjs/swagger';

export class MemberProfileImageResDto extends PickType(MemberEntity, [
	'username',
	'id',
	'profileImage',
] as const) {}
