import { ApiProperty } from '@nestjs/swagger';

import { NotificationResDto } from './notification.res.dto';

export class NotificationPaginateResDto {
	@ApiProperty({
		isArray: true,
		type: [NotificationResDto],
	})
	list!: NotificationResDto[];

	@ApiProperty({
		nullable: false,
	})
	page!: number;

	@ApiProperty({
		nullable: false,
	})
	totalPage!: number;
}
