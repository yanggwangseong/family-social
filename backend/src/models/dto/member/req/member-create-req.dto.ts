import { MemberEntity } from '@/entities/member.entity';
import { PickType } from '@nestjs/swagger';

export class MemberCreateReqDto extends PickType(MemberEntity, [
	'email',
	'username',
	'password',
	'phoneNumber',
] as const) {}
