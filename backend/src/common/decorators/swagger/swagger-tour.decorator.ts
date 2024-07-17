import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { BadRequestErrorResponse } from '@/constants/swagger-error-response';
import { withBasicPaginationResponse } from '@/models/dto/pagination/res/basic-pagination-res.dto';
import { TourHttpFestivalScheduleResDto } from '@/models/dto/tour/res/tour-http-festival-schedule-res.dto';
import { TourHttpImagesResDto } from '@/models/dto/tour/res/tour-http-images-res.dto';

import { ErrorResponse } from './error-response.decorator';
import { SuccessResponse } from './sucess-response.decorator';

export const GetHttpTourApiFestivalSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '행사 시작일 조회',
		}),

		ApiOkResponse({
			description: '행사정보조회 행사 시작일에 따른 행사 정보 조회',
		}),

		SuccessResponse(HttpStatus.OK, [
			{
				model: withBasicPaginationResponse(TourHttpFestivalScheduleResDto),
				exampleTitle: '행사 시작일 조회',
				exampleDescription: '행사 시작일에 따른 행사 정보 조회',
			},
		]),

		ErrorResponse(HttpStatus.BAD_REQUEST, [
			BadRequestErrorResponse['BadRequest-400-2'],
			BadRequestErrorResponse['BadRequest-400-3'],
			BadRequestErrorResponse['BadRequest-400-4'],
		]),
	);
};

export const GetHttpTourApiImagesByCotentIdSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '이미지 정보 조회',
		}),

		ApiOkResponse({
			description: 'contentId에 해당하는 관광정보에 매핑되는 이미지 정보 조회',
		}),

		SuccessResponse(HttpStatus.OK, [
			{
				model: withBasicPaginationResponse(TourHttpImagesResDto),
				exampleTitle: '이미지 정보 조회',
				exampleDescription:
					'contentId에 해당하는 관광정보에 매핑되는 이미지 정보 조회',
			},
		]),

		ErrorResponse(HttpStatus.BAD_REQUEST, [
			BadRequestErrorResponse['BadRequest-400-1'],
			BadRequestErrorResponse['BadRequest-400-2'],
			BadRequestErrorResponse['BadRequest-400-3'],
		]),
	);
};
