import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { CommentGetListsResDto } from '../../comments/res/comment-get-lists-res.dto';
import { MediaResDto } from '../../media/res/media-res.dto';
import { MentionResDto } from '../../mention/res/mention-res.dto';

export class FeedResDto {
	@ApiProperty({
		nullable: false,
		description: '피드 아이디',
	})
	feedId!: string;

	@ApiProperty({
		nullable: false,
		description: '피드 내용',
	})
	contents!: string;

	@ApiProperty({
		nullable: false,
		description: '피드 공개/비공개',
	})
	isPublic!: boolean;

	@ApiProperty({
		nullable: false,
		description: '피드의 그룹 아이디',
	})
	groupId!: string;

	@ApiProperty({
		nullable: false,
		description: '피드의 그룹 이름',
	})
	groupName!: string;

	@ApiProperty({
		nullable: false,
		description: '피드의 그룹 설명',
	})
	groupDescription?: string;

	@ApiPropertyOptional({
		nullable: true,
		description: '그룹 커버 이미지',
	})
	groupCoverImage?: string;

	@ApiProperty({
		nullable: false,
		description: '피드 작성 멤버 아이디',
	})
	memberId!: string;

	@ApiProperty({
		nullable: false,
		description: '피드 작성 멤버 이름',
	})
	username!: string;

	@ApiPropertyOptional({
		nullable: true,
		description: '피드 작성 멤버 프로필 이미지',
	})
	profileImage?: string;

	@ApiProperty({
		nullable: true,
		description: '피드 내가 좋아요 여/부',
	})
	myLike?: boolean;

	@ApiProperty({
		nullable: true,
		description: '피드 좋아요 갯수',
	})
	sumLike?: number;

	@ApiProperty({
		nullable: false,
		description: '피드 댓글 갯수',
	})
	sumComment!: number;

	@ApiPropertyOptional({
		nullable: true,
		type: [MediaResDto],
	})
	medias?: MediaResDto[];

	@ApiPropertyOptional({
		nullable: true,
		type: [CommentGetListsResDto],
	})
	@Type(() => CommentGetListsResDto)
	comments?: CommentGetListsResDto[];

	@ApiPropertyOptional({
		nullable: true,
		type: [MentionResDto],
	})
	mentions?: MentionResDto[];
}
