import { PickType } from '@nestjs/swagger';

import { CommentEntity } from '@/models/entities/comment.entity';

export class CommentUpdateReqDto extends PickType(CommentEntity, [
	'commentContents',
] as const) {}
