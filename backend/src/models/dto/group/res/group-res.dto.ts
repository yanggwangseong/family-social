import { GroupEntity } from '@/models/entities/group.entity';
import { PickType } from '@nestjs/swagger';

export class GroupResDto extends PickType(GroupEntity, [
	'id',
	'groupName',
	'groupDescription',
] as const) {}
