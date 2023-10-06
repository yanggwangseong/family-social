import { FeedEntity } from '@/models/entities/feed.entity';
import { PickType } from '@nestjs/swagger';

export class FeedCreateReqDto extends PickType(FeedEntity, [
	'isPublic',
	'contents',
	'groupId',
]) {}
