import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { stringValidationMessage } from '@/common/validation-message/string-validation-message';

export class TourPaginationQueryReqDto {
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
}
