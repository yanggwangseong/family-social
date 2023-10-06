import { GroupEntity } from '@/models/entities/group.entity';
import { PickType } from '@nestjs/swagger';

export class GroupCreateReqDto extends PickType(GroupEntity, [
	'groupName',
	'groupDescription',
] as const) {}
