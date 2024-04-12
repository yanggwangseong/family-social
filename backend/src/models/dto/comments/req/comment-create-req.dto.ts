import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { uuidValidationMessage } from '@/common/validation-message/uuid-validation-message';
import { CommentEntity } from '@/models/entities/comment.entity';

export class CommentCreateReqDto extends PickType(CommentEntity, [
	'commentContents',
	'replyId',
	'parentId',
] as const) {
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID(4, { message: uuidValidationMessage })
	feedWriterId!: string;
}
