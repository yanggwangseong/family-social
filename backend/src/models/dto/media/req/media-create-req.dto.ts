import { FeedMediaEntity } from '@/models/entities/fam-feed-media.entity';
import { PickType } from '@nestjs/swagger';

export class MediaCreateReqDto extends PickType(FeedMediaEntity, [
	'url',
	'position',
] as const) {}
