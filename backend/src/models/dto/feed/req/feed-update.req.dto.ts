import { ApiProperty, OmitType } from '@nestjs/swagger';
import { FeedCreateReqDto } from './feed-create-req.dto';
import { IsArray, IsNotEmpty } from 'class-validator';
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
