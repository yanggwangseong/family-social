import { ScheduleEntity } from '@/models/entities/schedule.entity';
import { PickType } from '@nestjs/swagger';

export class ScheduleByIdResDto extends PickType(ScheduleEntity, [
	'id',
] as const) {}
