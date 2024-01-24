import { ApiProperty } from '@nestjs/swagger';

import { ScheduleItemResDto } from './schedule-item-res.dto';

export class ScheduleResDto {
	@ApiProperty({
		nullable: false,
		type: [ScheduleItemResDto],
	})
	list!: ScheduleItemResDto[];

	@ApiProperty({
		nullable: false,
	})
	page!: number;

	@ApiProperty({
		nullable: false,
	})
	totalPage!: number;
}
