import { FeedEntity } from '@/models/entities/feed.entity';
import { PickType } from '@nestjs/swagger';

export class FeedByIdResDto extends PickType(FeedEntity, [
	'id',
	'isPublic',
] as const) {}
