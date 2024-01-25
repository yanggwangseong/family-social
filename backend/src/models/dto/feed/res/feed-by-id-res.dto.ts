import { PickType } from '@nestjs/swagger';

import { FeedEntity } from '@/models/entities/feed.entity';

export class FeedByIdResDto extends PickType(FeedEntity, [
	'id',
	'isPublic',
] as const) {}
