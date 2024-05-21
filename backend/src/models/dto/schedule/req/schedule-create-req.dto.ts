import { ApiProperty, PickType } from '@nestjs/swagger';
import { Transform, plainToInstance } from 'class-transformer';
import { IsArray, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';

import { arrayValidationMessage } from '@/common/validation-message/array-validation-message';
import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { uuidValidationMessage } from '@/common/validation-message/uuid-validation-message';
import { ScheduleEntity } from '@/models/entities/schedule.entity';

import { TourismCreateReqDto } from './tourism-create-req.dto';
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
	@Transform(({ value }) =>
		value.map((data: TourismPeriodCreateReqDto) => {
			const instance = plainToInstance(TourismPeriodCreateReqDto, data);

			instance.tourisms = data.tourisms.map((tour: TourismCreateReqDto) =>
				plainToInstance(TourismCreateReqDto, tour),
			);
			return instance;
		}),
	)
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsArray({ message: arrayValidationMessage })
	@ValidateNested({ each: true })
	//@Type(() => TourismPeriodCreateReqDto)
	periods!: TourismPeriodCreateReqDto[];

	@ApiProperty({
		nullable: false,
		type: [String],
	})
	@IsUUID(4, { message: uuidValidationMessage, each: true })
	sharedFamIds!: string[];
}
