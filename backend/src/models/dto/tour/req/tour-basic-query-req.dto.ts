import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

import { isInValidationMessage } from '@/common/validation-message/is-in-validation-message';
import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { stringValidationMessage } from '@/common/validation-message/string-validation-message';
import { contentTypeId, Union } from '@/types';

export class TourBasicQueryReqDto {
	@ApiProperty({
		nullable: false,
		description: '가지고 올 갯수',
	})
	@IsString({
		message: stringValidationMessage,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	numOfRows!: string;

	@ApiProperty({
		nullable: false,
		description: '페이지 번호',
	})
	@IsString({
		message: stringValidationMessage,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	pageNo!: string;

	@ApiProperty({
		nullable: false,
		description: '컨텐츠 타입',
		enum: contentTypeId,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsIn(contentTypeId, { message: isInValidationMessage })
	contentTypeId!: Union<typeof contentTypeId>;
}
