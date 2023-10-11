import { FeedMediaEntity } from '@/models/entities/fam-feed-media.entity';
import { PickType } from '@nestjs/swagger';

export class MediaResDto extends PickType(FeedMediaEntity, [
	'id',
	'url',
] as const) {}
