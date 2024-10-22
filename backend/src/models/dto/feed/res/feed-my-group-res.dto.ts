import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { FeedGroupItemResDto } from './feed-group-item-res.dto';
import { FeedResDto } from './feed-res.dto';

export class FeedMyGroupResDto extends PickType(FeedResDto, [
	'groupCoverImage',
	'groupDescription',
	'groupId',
	'groupName',
]) {
	@ApiProperty({
		nullable: false,
		type: [FeedGroupItemResDto],
	})
	@Type(() => FeedGroupItemResDto)
	feeds!: FeedGroupItemResDto[];
}
