import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { FeedEntity } from '@/models/entities/feed.entity';

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
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsArray()
	medias!: MediaCreateReqDto[];
}
