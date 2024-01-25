import { ApiProperty } from '@nestjs/swagger';

import { ScheduleGetListResDto } from './schedule-get-list-res.dto';

export class ScheduleResDto {
	@ApiProperty({
		nullable: false,
		type: [ScheduleGetListResDto],
	})
	list!: ScheduleGetListResDto[];

	@ApiProperty({
		nullable: false,
	})
	page!: number;

	@ApiProperty({
		nullable: false,
	})
	totalPage!: number;
}
