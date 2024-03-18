import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

import { arrayValidationMessage } from '@/common/validation-message/array-validation-message';
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
	@IsArray({ message: arrayValidationMessage })
	@ValidateNested({ each: true })
	@Type(() => TourismPeriodCreateReqDto)
	tourisms!: TourismCreateReqDto[];
}
