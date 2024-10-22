import { OmitType } from '@nestjs/swagger';

import { FeedResDto } from './feed-res.dto';

export class FeedGroupItemResDto extends OmitType(FeedResDto, [
	'groupCoverImage',
	'groupName',
	'groupDescription',
	'groupId',
]) {}
