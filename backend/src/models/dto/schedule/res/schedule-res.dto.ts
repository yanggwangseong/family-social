import { ApiProperty, PickType } from '@nestjs/swagger';

import { ScheduleEntity } from '@/models/entities/schedule.entity';

import { TourismPeriodResDto } from './tourism-period-res.dto';

export class ScheduleResDto extends PickType(ScheduleEntity, [
	'id',
	'groupId',
	'updatedAt',
] as const) {
	@ApiProperty({
		nullable: false,
		type: [TourismPeriodResDto],
	})
	schdulePeriods!: TourismPeriodResDto[];
}
