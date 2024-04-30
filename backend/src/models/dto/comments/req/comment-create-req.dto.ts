import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';

import { arrayValidationMessage } from '@/common/validation-message/array-validation-message';
import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { uuidValidationMessage } from '@/common/validation-message/uuid-validation-message';
import { CommentEntity } from '@/models/entities/comment.entity';

import { MentionCreateReqDto } from '../../mention/req/mention-create-req.dto';

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

	@ApiProperty({
		nullable: true,
		type: [MentionCreateReqDto],
	})
	@IsArray({ message: arrayValidationMessage })
	@ValidateNested({ each: true })
	@Type(() => MentionCreateReqDto)
	mentions!: MentionCreateReqDto[];
}
