import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { arrayValidationMessage } from '@/common/validation-message/array-validation-message';
import { CommentEntity } from '@/models/entities/comment.entity';

import { MentionCreateReqDto } from '../../mention/req/mention-create-req.dto';

export class CommentUpdateReqDto extends PickType(CommentEntity, [
	'commentContents',
] as const) {
	@ApiProperty({
		nullable: true,
		type: [MentionCreateReqDto],
	})
	@IsArray({ message: arrayValidationMessage })
	@ValidateNested({ each: true })
	@Type(() => MentionCreateReqDto)
	mentions!: MentionCreateReqDto[];
}
