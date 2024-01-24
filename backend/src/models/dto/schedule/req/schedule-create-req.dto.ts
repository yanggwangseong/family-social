import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

import { ScheduleEntity } from '@/models/entities/schedule.entity';

import { TourismPeriodCreateReqDto } from './tourism-period-create-req.dto';

export class ScheduleCreateReqDto extends PickType(ScheduleEntity, [
	'scheduleName',
	'startPeriod',
	'endPeriod',
] as const) {
	@ApiProperty({
		nullable: false,
		type: [TourismPeriodCreateReqDto],
	})
	@IsNotEmpty()
	@IsArray()
	periods!: TourismPeriodCreateReqDto[];
}
