import {
	ApiProperty,
	ApiPropertyOptional,
	OmitType,
	PickType,
} from '@nestjs/swagger';

import { CommentEntity } from '@/models/entities/comment.entity';

import { MemberResDto } from '../../member/res/member-res.dto';

export class CommentGetListsResDto extends PickType(CommentEntity, [
	'id',
	'commentContents',
	'updatedAt',
	'replyId',
	'parentId',
	'feedId',
] as const) {
	@ApiProperty({
		nullable: true,
	})
	myLikeByComment?: boolean;

	@ApiProperty({
		nullable: true,
	})
	sumLikeByComment?: number;

	@ApiProperty({
		nullable: false,
	})
	member!: MemberResDto;

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
