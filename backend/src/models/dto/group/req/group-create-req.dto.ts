import { PickType } from '@nestjs/swagger';

import { GroupEntity } from '@/models/entities/group.entity';

export class GroupCreateReqDto extends PickType(GroupEntity, [
	'groupName',
	'groupDescription',
] as const) {}
