import { ApiProperty, PickType } from '@nestjs/swagger';

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
] as const) {
	@ApiProperty({
		nullable: false,
	})
	eventGroup!: GroupProfileResDto;

	@ApiProperty({
		nullable: false,
	})
	eventOrganizer!: MemberSearchResDto;
}
