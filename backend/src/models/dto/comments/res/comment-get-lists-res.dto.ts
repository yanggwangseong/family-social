import {
	ApiProperty,
	ApiPropertyOptional,
	OmitType,
	PickType,
} from '@nestjs/swagger';

import { CommentEntity } from '@/models/entities/comment.entity';

import { MemberSearchResDto } from '../../member/res/member-search-res.dto';
import { MentionResDto } from '../../mention/res/mention-res.dto';

export class CommentGetListsResDto extends PickType(CommentEntity, [
	'id',
	'commentContents',
	'replyId',
	'parentId',
	'feedId',
	'updatedAt',
] as const) {
	@ApiProperty({
		nullable: true,
		description: '나의 해당 댓글 좋아요 여/부',
	})
	myLikeByComment?: boolean;

	@ApiProperty({
		nullable: true,
		description: '해당 댓글 좋아요 갯수',
	})
	sumLikeByComment?: number;

	@ApiProperty({
		nullable: false,
	})
	member!: MemberSearchResDto;

	@ApiPropertyOptional({
		nullable: true,
		type: [MentionResDto],
	})
	mentions!: MentionResDto[];

	@ApiPropertyOptional({
		isArray: true,
		nullable: true,
		type: () => [ChildrenCommentsResDtoSwagger],
	})
	childrenComments?: CommentGetListsResDto[];
}

export class ChildrenCommentsResDtoSwagger extends OmitType(
	CommentGetListsResDto,
	['childrenComments'] as const,
) {}
