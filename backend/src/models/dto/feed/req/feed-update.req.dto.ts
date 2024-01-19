import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

import { FeedCreateReqDto } from './feed-create-req.dto';
import { MediaUpdateReqDto } from '../../media/req/media-update-req-dto';

export class FeedUpdateReqDto extends OmitType(FeedCreateReqDto, [
	'medias',
] as const) {
	@ApiProperty({
		nullable: false,
		type: [MediaUpdateReqDto],
	})
	@IsNotEmpty()
	@IsArray()
	medias!: MediaUpdateReqDto[];
}
