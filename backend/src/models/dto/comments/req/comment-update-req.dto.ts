import { CommentEntity } from '@/models/entities/comment.entity';
import { PickType } from '@nestjs/swagger';

export class CommentUpdateReqDto extends PickType(CommentEntity, [
	'commentContents',
] as const) {}
