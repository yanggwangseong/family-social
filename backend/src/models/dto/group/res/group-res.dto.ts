import { PickType } from '@nestjs/swagger';

import { GroupEntity } from '@/models/entities/group.entity';

export class GroupResDto extends PickType(GroupEntity, [
	'id',
	'groupName',
	'groupDescription',
] as const) {}
