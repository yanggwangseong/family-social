import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { FeedResDto } from './feed-res.dto';

export class FeedMyGroupResDto extends PickType(FeedResDto, [
	'groupCoverImage',
	'groupDescription',
	'groupId',
	'groupName',
]) {
	@ApiProperty({
		nullable: false,
		type: [FeedResDto],
	})
	@Type(() => FeedResDto)
	feeds!: FeedResDto[];
}
