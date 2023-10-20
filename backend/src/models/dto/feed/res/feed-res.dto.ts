import { ApiProperty } from '@nestjs/swagger';
import { MediaResDto } from '../../media/res/media-res.dto';

export class FeedResDto {
	@ApiProperty({
		nullable: false,
	})
	feedId!: string;

	@ApiProperty({
		nullable: false,
	})
	contents!: string;

	@ApiProperty({
		nullable: false,
	})
	groupId!: string;

	@ApiProperty({
		nullable: false,
	})
	groupName!: string;

	@ApiProperty({
		nullable: false,
	})
	memberId!: string;

	@ApiProperty({
		nullable: false,
	})
	username!: string;

	@ApiProperty({
		nullable: true,
		type: [MediaResDto],
	})
	medias?: MediaResDto[];
}
