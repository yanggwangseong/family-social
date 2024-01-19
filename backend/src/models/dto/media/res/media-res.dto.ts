import { PickType } from '@nestjs/swagger';

import { FeedMediaEntity } from '@/models/entities/fam-feed-media.entity';

export class MediaResDto extends PickType(FeedMediaEntity, [
	'id',
	'url',
] as const) {}
