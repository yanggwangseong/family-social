import { ApiProperty } from '@nestjs/swagger';
import { FeedResDto } from './feed-res.dto';

export class FeedGetAllResDto {
	@ApiProperty({
		nullable: false,
		type: [FeedResDto],
	})
	list!: FeedResDto[];

	@ApiProperty({
		nullable: false,
	})
	page!: number;

	@ApiProperty({
		nullable: false,
	})
	totalPage!: number;
}
