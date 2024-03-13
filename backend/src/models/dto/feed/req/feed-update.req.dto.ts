import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

import { arrayValidationMessage } from '@/common/validation-message/array-validation-message';
import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';

import { FeedCreateReqDto } from './feed-create-req.dto';
import { MediaCreateReqDto } from '../../media/req/media-create-req.dto';
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
	@IsArray({ message: arrayValidationMessage })
	@ValidateNested({ each: true })
	@Type(() => MediaCreateReqDto)
	medias!: MediaUpdateReqDto[];
}
