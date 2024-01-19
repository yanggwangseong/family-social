import { PickType } from '@nestjs/swagger';

import { FeedMediaEntity } from '@/models/entities/fam-feed-media.entity';

export class MediaCreateReqDto extends PickType(FeedMediaEntity, [
	'url',
	'position',
] as const) {}
