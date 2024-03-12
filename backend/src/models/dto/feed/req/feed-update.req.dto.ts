import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';

import { FeedCreateReqDto } from './feed-create-req.dto';
import { MediaUpdateReqDto } from '../../media/req/media-update-req-dto';

export class FeedUpdateReqDto extends OmitType(FeedCreateReqDto, [
	'medias',
] as const) {
	@ApiProperty({
		nullable: false,
		type: [MediaUpdateReqDto],
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsArray()
	medias!: MediaUpdateReqDto[];
}
