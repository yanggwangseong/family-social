import { PickType } from '@nestjs/swagger';

import { GroupEventEntity } from '@/models/entities/group-event.entity';

export class GroupEventCreateReqDto extends PickType(GroupEventEntity, [
	'eventType',
	'eventCoverImage',
	'eventName',
	'eventDescription',
	'eventStartDate',
	'eventStartTime',
	'eventEndDate',
	'eventEndTime',
] as const) {}
