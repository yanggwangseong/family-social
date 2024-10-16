import { PickType } from '@nestjs/swagger';

import { GroupFollowEntity } from '@/models/entities/group.follow.entity';

export class ToggleFollowGroupReqDto extends PickType(GroupFollowEntity, [
	'followingGroupId',
]) {}
