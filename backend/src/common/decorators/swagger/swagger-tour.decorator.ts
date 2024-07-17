import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { BadRequestErrorResponse } from '@/constants/swagger-error-response';
import { withBasicPaginationResponse } from '@/models/dto/pagination/res/basic-pagination-res.dto';
import { TourHttpFestivalScheduleResDto } from '@/models/dto/tour/res/tour-http-festival-schedule-res.dto';

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
