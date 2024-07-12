import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';

import { FeedErrorResponse } from '@/constants/swagger-error-response';
import { FeedByIdResDto } from '@/models/dto/feed/res/feed-by-id-res.dto';
import { FeedResDto } from '@/models/dto/feed/res/feed-res.dto';
import { withBasicPaginationResponse } from '@/models/dto/pagination/res/basic-pagination-res.dto';

import { ErrorResponse } from './error-response.decorator';
import { SuccessResponse } from './sucess-response.decorator';

export const GetFeedDetailSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '단일 피드 가져오기',
		}),
		SuccessResponse(HttpStatus.OK, [
			{
				model: FeedResDto,
				exampleTitle: '단일 피드 가져오기',
				exampleDescription: '피드 조회 성공',
			},
		]),
		ErrorResponse(HttpStatus.NOT_FOUND, [FeedErrorResponse['Feed-404-1']]),
	);
};

export const GetFeedsSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '피드 가져오기',
		}),
		SuccessResponse(HttpStatus.OK, [
			{
				model: withBasicPaginationResponse(FeedResDto),
				exampleTitle: '피드 리스트 가져오기',
				exampleDescription: '피드 조회 성공',
			},
		]),
	);
};

export const CreateFeedSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '피드 생성',
		}),
		// 커스텀 데코레이터!
		SuccessResponse(HttpStatus.CREATED, [
			{
				model: FeedByIdResDto,
				exampleTitle: '공개 피드 생성',
				exampleDescription: '공개 피드 생성시 응답값 입니다',
			},
			{
				model: FeedByIdResDto,
				exampleTitle: '비공개 피드 생성',
				exampleDescription: '비공개 피드 생성시 응답값 입니다',
				overrideValue: {
					isPublic: false,
				},
			},
		]),
	);
};

export const UpdateFeedSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '피드 수정',
		}),
		ApiOkResponse({
			description: '피드 수정 성공',
		}),

		ErrorResponse(HttpStatus.NOT_FOUND, [FeedErrorResponse['Feed-404-1']]),
	);
};

export const LikesFeedSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '피드 좋아요',
		}),
		ApiCreatedResponse({
			description: '피드 좋아요',
			type: Boolean,
		}),

		ErrorResponse(HttpStatus.NOT_FOUND, [FeedErrorResponse['Feed-404-1']]),
	);
};

export const DeleteFeedSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '피드 삭제',
		}),
		ApiOkResponse({
			description: '피드 삭제 성공',
		}),

		ErrorResponse(HttpStatus.BAD_REQUEST, [FeedErrorResponse['Feed-400-1']]),
		ErrorResponse(HttpStatus.NOT_FOUND, [
			FeedErrorResponse['Feed-404-1'],
			FeedErrorResponse['Feed-404-2'],
		]),
		ErrorResponse(HttpStatus.FORBIDDEN, [FeedErrorResponse['Feed-403-1']]),
		ErrorResponse(HttpStatus.CONFLICT, [FeedErrorResponse['Feed-409-1']]),
	);
};
