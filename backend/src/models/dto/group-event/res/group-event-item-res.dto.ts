import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { GroupEventEntity } from '@/models/entities/group-event.entity';

import { GroupProfileResDto } from '../../group/res/group-profile.rest.dto';
import { MemberSearchResDto } from '../../member/res/member-search-res.dto';

export class GroupEventItemResDto extends PickType(GroupEventEntity, [
	'id',
	'eventType',
	'eventCoverImage',
	'eventName',
	'eventDescription',
	'eventStartDate',
	'eventStartTime',
	'eventEndDate',
	'eventEndTime',
	'eventGroupId',
	'eventOrganizerId',
	'createdAt',
] as const) {
	@ApiProperty({
		nullable: false,
	})
	@Type(() => GroupProfileResDto)
	eventGroup!: GroupProfileResDto;

	@ApiProperty({
		nullable: false,
	})
	@Type(() => MemberSearchResDto)
	eventOrganizer!: MemberSearchResDto;
}
