import { MemberGroupEntity } from '@/entities/member-group.entity';
import { PickType } from '@nestjs/swagger';

export class GroupMemberCreateReqDto extends PickType(MemberGroupEntity, [
	'memberId',
] as const) {}
