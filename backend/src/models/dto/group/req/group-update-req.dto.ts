import { GroupEntity } from '@/entities/group.entity';
import { PickType } from '@nestjs/swagger';

export class GroupUpdateReqDto extends PickType(GroupEntity, [
	'groupName',
	'groupDescription',
]) {}
