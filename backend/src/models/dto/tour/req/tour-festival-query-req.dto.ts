import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

import { lengthValidationMessage } from '@/common/validation-message/length-validation-message';
import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { stringValidationMessage } from '@/common/validation-message/string-validation-message';

export class TourFestivalQueryReqDto {
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
		description: '정렬구분 (A=제목순, C=수정일순, D=생성일순)',
	})
	arrange!: string; //정렬구분 (A=제목순, C=수정일순, D=생성일순)

	@ApiProperty({
		nullable: false,
		description: '지역 코드',
	})
	@IsString({
		message: stringValidationMessage,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	areaCode!: string;

	@ApiProperty({
		nullable: false,
		description: '시군구코드',
	})
	@IsString({
		message: stringValidationMessage,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	sigunguCode!: string;

	@ApiProperty({
		nullable: false,
		description: '축제 시작 일자',
	})
	@IsString({
		message: stringValidationMessage,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@Length(8, 8, { message: lengthValidationMessage })
	eventStartDate!: string;
}
