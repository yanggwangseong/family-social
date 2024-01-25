import { PickType } from '@nestjs/swagger';

import { ScheduleEntity } from '@/models/entities/schedule.entity';

export class ScheduleGetListResDto extends PickType(ScheduleEntity, [
	'id',
	'groupId',
	'scheduleImage',
	'scheduleName',
	'startPeriod',
	'endPeriod',
	'updatedAt',
] as const) {}
