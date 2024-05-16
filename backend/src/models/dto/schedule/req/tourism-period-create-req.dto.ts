import { ApiProperty, PickType } from '@nestjs/swagger';
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
	//@Type(() => TourismCreateReqDto)
	@ValidateNested({ each: true })
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsArray({ message: arrayValidationMessage })
	tourisms!: TourismCreateReqDto[];
}
