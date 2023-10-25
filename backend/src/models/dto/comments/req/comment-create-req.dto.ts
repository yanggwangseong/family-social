import { CommentEntity } from '@/models/entities/comment.entity';
import { PickType } from '@nestjs/swagger';

export class CommentCreateReqDto extends PickType(CommentEntity, [
	'commentContents',
	'replyId',
	'parentId',
	'feedId',
] as const) {}
