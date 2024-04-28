import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

import { arrayValidationMessage } from '@/common/validation-message/array-validation-message';
import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { FeedEntity } from '@/models/entities/feed.entity';

import { MediaCreateReqDto } from '../../media/req/media-create-req.dto';
import { MentionCreateReqDto } from '../../mention/req/mention-create-req.dto';

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
	@IsArray({ message: arrayValidationMessage })
	@ValidateNested({ each: true })
	@Type(() => MediaCreateReqDto)
	medias!: MediaCreateReqDto[];

	@ApiProperty({
		nullable: true,
		type: [MentionCreateReqDto],
	})
	@IsArray({ message: arrayValidationMessage })
	mentions!: MentionCreateReqDto[];
}
