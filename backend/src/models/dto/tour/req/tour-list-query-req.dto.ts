import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { isInValidationMessage } from '@/common/validation-message/is-in-validation-message';
import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { stringValidationMessage } from '@/common/validation-message/string-validation-message';
import { contentTypeId, TourArrange, Union } from '@/types';

export class TourListQueryReqDto {
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
		description:
			'정렬구분 (A=제목순, C=수정일순, D=생성일순) 대표이미지가반드시있는(O=제목순, Q=수정일순, R=생성일순)',
		enum: TourArrange,
	})
	@IsString({
		message: stringValidationMessage,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsIn(TourArrange, { message: isInValidationMessage })
	arrange!: Union<typeof TourArrange>;

	@ApiProperty({
		nullable: false,
		description:
			'관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점)',
		enum: contentTypeId,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsIn(contentTypeId, { message: isInValidationMessage })
	contentTypeId!: Union<typeof contentTypeId>;

	@ApiPropertyOptional({
		nullable: true,
		description: '지역 코드',
	})
	@IsOptional()
	@IsString({
		message: stringValidationMessage,
	})
	areaCode!: string;

	@ApiPropertyOptional({
		nullable: true,
		description: '시군구코드',
	})
	@IsOptional()
	@IsString({
		message: stringValidationMessage,
	})
	sigunguCode!: string;

	@ApiPropertyOptional({
		nullable: false,
		description: '대분류 코드',
	})
	@IsOptional()
	@IsString({
		message: stringValidationMessage,
	})
	cat1!: string;

	@ApiPropertyOptional({
		nullable: false,
		description: '중분류 코드',
	})
	@IsOptional()
	@IsString({
		message: stringValidationMessage,
	})
	cat2!: string;

	@ApiPropertyOptional({
		nullable: false,
		description: '소분류 코드',
	})
	@IsOptional()
	@IsString({
		message: stringValidationMessage,
	})
	cat3!: string;
}
