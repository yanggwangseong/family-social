import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { BadRequestErrorResponse } from '@/constants/swagger-error-response';
import { withBasicPaginationResponse } from '@/models/dto/pagination/res/basic-pagination-res.dto';
import { AdditionalAccommodationResDto } from '@/models/dto/tour/res/additional-explanation/additional-accommodation-res.dto';
import { AdditionalCommonResDto } from '@/models/dto/tour/res/additional-explanation/addtional-common-res.dto';
import { AdditionalTravelCourseResDto } from '@/models/dto/tour/res/additional-explanation/addtional-travel-course-res.dto';
import { TourHttpAccommodationResDto } from '@/models/dto/tour/res/introduction/tour-http-accommodation-res.dto';
import { TourHttpCulturalResDto } from '@/models/dto/tour/res/introduction/tour-http-cultural-res.dto';
import { TourHttpFestivalResDto } from '@/models/dto/tour/res/introduction/tour-http-festival-res.dto';
import { TourHttpLeisureResDto } from '@/models/dto/tour/res/introduction/tour-http-leisure-res.dto';
import { TourHttpRestaurantResDto } from '@/models/dto/tour/res/introduction/tour-http-restaurant-res.dto';
import { TourHttpShoppingResDto } from '@/models/dto/tour/res/introduction/tour-http-shopping-res.dto';
import { TourHttpTouristResDto } from '@/models/dto/tour/res/introduction/tour-http-tourist-res.dto';
import { TourHttpTravelCourseResDto } from '@/models/dto/tour/res/introduction/tour-http-travel-course-res.dto';
import { TourHttpCommonResDto } from '@/models/dto/tour/res/tour-http-common-res.dto';
import { TourHttpFestivalScheduleResDto } from '@/models/dto/tour/res/tour-http-festival-schedule-res.dto';
import { TourHttpImagesResDto } from '@/models/dto/tour/res/tour-http-images-res.dto';
import { TourHttpServiceCategoryResDto } from '@/models/dto/tour/res/tour-http-service-category-res.dto';

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
			BadRequestErrorResponse['BadRequest-400-2'],
			BadRequestErrorResponse['BadRequest-400-3'],
			BadRequestErrorResponse['BadRequest-400-5'],
		]),
	);
};

export const GetHttpTourApiIntroductionSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '소개 정보 조회',
		}),

		ApiOkResponse({
			description: 'contentId에 따라 다른 소개 정보 조회를 제공',
		}),

		SuccessResponse(HttpStatus.OK, [
			{
				model: withBasicPaginationResponse(TourHttpTouristResDto),
				exampleTitle: '관광지 조회',
				exampleDescription: '관광지(12)',
			},
			{
				model: withBasicPaginationResponse(TourHttpCulturalResDto),
				exampleTitle: '문화시설 조회',
				exampleDescription: '문화시설(14)',
			},
			{
				model: withBasicPaginationResponse(TourHttpFestivalResDto),
				exampleTitle: '축제공연행사 조회',
				exampleDescription: '축제공연행사(15)',
			},
			{
				model: withBasicPaginationResponse(TourHttpTravelCourseResDto),
				exampleTitle: '여행코스 조회',
				exampleDescription: '여행코스(25)',
			},
			{
				model: withBasicPaginationResponse(TourHttpLeisureResDto),
				exampleTitle: '레저 조회',
				exampleDescription: '레저(28)',
			},
			{
				model: withBasicPaginationResponse(TourHttpAccommodationResDto),
				exampleTitle: '숙박 조회',
				exampleDescription: '숙박(32)',
			},
			{
				model: withBasicPaginationResponse(TourHttpShoppingResDto),
				exampleTitle: '쇼핑 조회',
				exampleDescription: '쇼핑(38)',
			},
			{
				model: withBasicPaginationResponse(TourHttpRestaurantResDto),
				exampleTitle: '음식점 조회',
				exampleDescription: '음식점(39)',
			},
		]),

		ErrorResponse(HttpStatus.BAD_REQUEST, [
			BadRequestErrorResponse['BadRequest-400-2'],
			BadRequestErrorResponse['BadRequest-400-3'],
			BadRequestErrorResponse['BadRequest-400-5'],
		]),
	);
};

export const GetHttpTourApiCommonInformationSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '공통정보 조회',
		}),

		ApiOkResponse({
			description: 'contentId에 따라 공통정보를 제공',
		}),

		SuccessResponse(HttpStatus.OK, [
			{
				model: withBasicPaginationResponse(TourHttpCommonResDto),
				exampleTitle: '공통정보 조회',
				exampleDescription: 'contentId에 따라 공통정보를 제공',
			},
		]),

		ErrorResponse(HttpStatus.BAD_REQUEST, [
			BadRequestErrorResponse['BadRequest-400-2'],
			BadRequestErrorResponse['BadRequest-400-3'],
			BadRequestErrorResponse['BadRequest-400-5'],
		]),
	);
};

export const GetHttpTourApiServiceCategoriesSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '서비스 분류 코드 조회',
		}),

		ApiOkResponse({
			description: '서비스 분류 코드 정보를 제공',
		}),

		SuccessResponse(HttpStatus.OK, [
			{
				model: withBasicPaginationResponse(TourHttpServiceCategoryResDto),
				exampleTitle: '서비스 분류 코드 조회',
				exampleDescription: '서비스 분류 코드 정보를 제공',
			},
		]),

		ErrorResponse(HttpStatus.BAD_REQUEST, [
			BadRequestErrorResponse['BadRequest-400-2'],
			BadRequestErrorResponse['BadRequest-400-3'],
			BadRequestErrorResponse['BadRequest-400-5'],
		]),
	);
};

export const GetHttpTourApiAreaCodesSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '지역 코드 조회',
		}),

		ApiOkResponse({
			description: '지역 코드 정보를 제공',
		}),

		SuccessResponse(HttpStatus.OK, [
			{
				model: withBasicPaginationResponse(TourHttpServiceCategoryResDto),
				exampleTitle: '지역 코드 조회',
				exampleDescription: '지역 코드 정보를 제공',
			},
		]),

		ErrorResponse(HttpStatus.BAD_REQUEST, [
			BadRequestErrorResponse['BadRequest-400-2'],
			BadRequestErrorResponse['BadRequest-400-3'],
		]),
	);
};
