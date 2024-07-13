import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';

import {
	BadRequestErrorResponse,
	GroupErrorResponse,
	GroupEventErrorResponse,
} from '@/constants/swagger-error-response';
import { GroupEventItemResDto } from '@/models/dto/group-event/res/group-event-item-res.dto';
import { withBasicPaginationResponse } from '@/models/dto/pagination/res/basic-pagination-res.dto';

import { ErrorResponse } from './error-response.decorator';
import { PagiNationQuerySwagger } from './query/swagger-pagination-query';
import { SuccessResponse } from './sucess-response.decorator';

export const GetGroupEventsSwagger = () => {
	return applyDecorators(
		PagiNationQuerySwagger(),

		ApiOperation({
			summary: '특정 그룹의 그룹 이벤트 리스트 가져오기',
		}),

		SuccessResponse(HttpStatus.OK, [
			{
				model: withBasicPaginationResponse(GroupEventItemResDto),
				exampleTitle: '그룹 이벤트 리스트 가져오기',
				exampleDescription: '특정 그룹의 그룹 이벤트 리스트 가져오기',
			},
		]),
		ErrorResponse(HttpStatus.NOT_FOUND, [GroupErrorResponse['Group-404-1']]),
		ErrorResponse(HttpStatus.CONFLICT, [GroupErrorResponse['Group-409-1']]),
	);
};

export const GetGroupEventByGroupEventIdSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '특정 그룹의 그룹 이벤트 가져오기',
		}),
		SuccessResponse(HttpStatus.OK, [
			{
				model: GroupEventItemResDto,
				exampleTitle: '그룹 특정 이벤트 가져오기',
				exampleDescription: '특정 그룹의 특정 이벤트 가져오기',
			},
		]),
		ErrorResponse(HttpStatus.NOT_FOUND, [GroupErrorResponse['Group-404-1']]),
		ErrorResponse(HttpStatus.CONFLICT, [
			GroupErrorResponse['Group-409-1'],
			GroupEventErrorResponse['GroupEvent-409-1'],
		]),
	);
};

export const PostGroupEventSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '특정 그룹의 그룹 이벤트 생성',
		}),
		ApiCreatedResponse({
			description: '특정 그룹의 그룹 이벤트 생성 성공',
		}),

		ErrorResponse(HttpStatus.NOT_FOUND, [
			GroupErrorResponse['Group-404-1'],
			GroupEventErrorResponse['GroupEvent-404-1'],
		]),
		ErrorResponse(HttpStatus.CONFLICT, [GroupErrorResponse['Group-409-1']]),
	);
};

export const DeleteGroupEventSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '특정 그룹의 그룹 이벤트 삭제',
		}),
		ApiOkResponse({
			description: '특정 그룹의 그룹 이벤트 삭제 성공',
		}),
		ErrorResponse(HttpStatus.NOT_FOUND, [
			GroupErrorResponse['Group-404-1'],
			GroupEventErrorResponse['GroupEvent-404-1'],
		]),
		ErrorResponse(HttpStatus.CONFLICT, [
			GroupErrorResponse['Group-409-1'],
			GroupEventErrorResponse['GroupEvent-409-1'],
		]),

		ErrorResponse(HttpStatus.BAD_REQUEST, [
			BadRequestErrorResponse['BadRequest-400-1'],
		]),
	);
};

export const PutGroupEventSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '특정 그룹의 그룹 이벤트 수정',
		}),
		ApiOkResponse({
			description: '특정 그룹의 그룹 이벤트 수정',
		}),
		ErrorResponse(HttpStatus.NOT_FOUND, [
			GroupErrorResponse['Group-404-1'],
			GroupEventErrorResponse['GroupEvent-404-1'],
		]),
		ErrorResponse(HttpStatus.CONFLICT, [
			GroupErrorResponse['Group-409-1'],
			GroupEventErrorResponse['GroupEvent-409-1'],
		]),
		ErrorResponse(HttpStatus.BAD_REQUEST, [
			BadRequestErrorResponse['BadRequest-400-1'],
		]),
	);
};
