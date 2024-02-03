import { PickType } from '@nestjs/swagger';

import { ScheduleEntity } from '@/models/entities/schedule.entity';

export class ScheduleUpdateTitleDto extends PickType(ScheduleEntity, [
	'scheduleName',
] as const) {}
