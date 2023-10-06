import { MemberEntity } from '@/models/entities/member.entity';
import { PickType } from '@nestjs/swagger';

export class MemberLoginReqDto extends PickType(MemberEntity, [
	'email',
	'password',
] as const) {}
