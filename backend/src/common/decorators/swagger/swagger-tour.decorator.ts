import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { BadRequestErrorResponse } from '@/constants/swagger-error-response';
import { withBasicPaginationResponse } from '@/models/dto/pagination/res/basic-pagination-res.dto';
import { AdditionalAccommodationResDto } from '@/models/dto/tour/res/additional-explanation/additional-accommodation-res.dto';
import { AdditionalCommonResDto } from '@/models/dto/tour/res/additional-explanation/addtional-common-res.dto';
import { AdditionalTravelCourseResDto } from '@/models/dto/tour/res/additional-explanation/addtional-travel-course-res.dto';
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

export const GetHttpTourApiAdditionalExplanationSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '반복 추가 정보 조회',
		}),

		ApiOkResponse({
			description: 'contentId에 따라 다른 반복 추가 정보 조회를 제공',
		}),

		SuccessResponse(HttpStatus.OK, [
			{
				model: withBasicPaginationResponse(AdditionalCommonResDto),
				exampleTitle: '공통 반복 추가 정보 조회',
				exampleDescription:
					'문화시설(14), 관광지(12), 축제공연행사(15), 28(레저), 38(쇼핑), 39(음식점)',
			},
			{
				model: withBasicPaginationResponse(AdditionalTravelCourseResDto),
				exampleTitle: '여행 코스 조회',
				exampleDescription: '여행코스(25)',
			},
			{
				model: withBasicPaginationResponse(AdditionalAccommodationResDto),
				exampleTitle: '숙박 조회',
				exampleDescription: '숙박(32)',
			},
		]),

		ErrorResponse(HttpStatus.BAD_REQUEST, [
			BadRequestErrorResponse['BadRequest-400-1'],
			BadRequestErrorResponse['BadRequest-400-2'],
			BadRequestErrorResponse['BadRequest-400-3'],
			BadRequestErrorResponse['BadRequest-400-5'],
		]),
	);
};
