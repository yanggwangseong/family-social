import { FeedEntity } from '@/models/entities/feed.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { GroupResDto } from '../../group/res/group-res.dto';
import { MemberResDto } from '../../member/res/member-res.dto';
import { MediaResDto } from '../../media/res/media-res.dto';

export class FeedDetailResDto extends PickType(FeedEntity, [
	'id',
	'contents',
] as const) {
	@ApiProperty({
		nullable: false,
	})
	group!: GroupResDto;

	@ApiProperty({
		nullable: false,
	})
	member!: MemberResDto;

	@ApiProperty({
		nullable: true,
		type: [MediaResDto],
	})
	medias?: MediaResDto[];
}
