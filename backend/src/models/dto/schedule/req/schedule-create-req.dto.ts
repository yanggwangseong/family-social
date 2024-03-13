import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

import { arrayValidationMessage } from '@/common/validation-message/array-validation-message';
import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
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
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsArray({ message: arrayValidationMessage })
	periods!: TourismPeriodCreateReqDto[];
}
