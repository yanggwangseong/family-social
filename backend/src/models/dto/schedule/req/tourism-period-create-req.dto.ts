import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { TourismPeriodEntity } from '@/models/entities/tourism-period.entity';

import { TourismCreateReqDto } from './tourism-create-req.dto';

export class TourismPeriodCreateReqDto extends PickType(TourismPeriodEntity, [
	'period',
	'startTime',
	'endTime',
] as const) {
	@ApiProperty({
		nullable: false,
		type: [TourismCreateReqDto],
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsArray()
	tourisms!: TourismCreateReqDto[];
}
