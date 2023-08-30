import { GroupEntity } from '@/entities/group.entity';
import { PickType } from '@nestjs/swagger';

export class GroupCreateReqDto extends PickType(GroupEntity, [
	'groupName',
] as const) {}
