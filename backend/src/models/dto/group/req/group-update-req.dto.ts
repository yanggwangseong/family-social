import { PickType } from '@nestjs/swagger';

import { GroupEntity } from '@/models/entities/group.entity';

export class GroupUpdateReqDto extends PickType(GroupEntity, [
	'groupName',
	'groupDescription',
]) {}
