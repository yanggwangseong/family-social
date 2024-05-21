import { PickType } from '@nestjs/swagger';

import { GroupEntity } from '@/models/entities/group.entity';

export class GroupProfileResDto extends PickType(GroupEntity, [
	'id',
	'groupName',
	'groupDescription',
	'groupCoverImage',
] as const) {}
