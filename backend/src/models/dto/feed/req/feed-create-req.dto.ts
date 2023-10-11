import { FeedEntity } from '@/models/entities/feed.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { MediaCreateReqDto } from '../../media/req/media-create-req.dto';

export class FeedCreateReqDto extends PickType(FeedEntity, [
	'isPublic',
	'contents',
	'groupId',
] as const) {
	@ApiProperty({
		nullable: false,
		type: [MediaCreateReqDto],
	})
	@IsNotEmpty()
	@IsArray()
	medias!: MediaCreateReqDto[];
}
