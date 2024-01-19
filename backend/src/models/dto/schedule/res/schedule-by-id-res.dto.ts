import { PickType } from '@nestjs/swagger';

import { ScheduleEntity } from '@/models/entities/schedule.entity';

export class ScheduleByIdResDto extends PickType(ScheduleEntity, [
	'id',
] as const) {}
