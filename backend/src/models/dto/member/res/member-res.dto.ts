import { MemberEntity } from '@/models/entities/member.entity';
import { PickType } from '@nestjs/swagger';

export class MemberResDto extends PickType(MemberEntity, [
	'username',
	'id',
] as const) {}
