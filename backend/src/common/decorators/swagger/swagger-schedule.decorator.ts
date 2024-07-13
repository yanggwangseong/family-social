import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';

import {
	GroupErrorResponse,
	ScheduleErrorResponse,
} from '@/constants/swagger-error-response';
import { ScheduleByIdResDto } from '@/models/dto/schedule/res/schedule-by-id-res.dto';
import { ScheduleResDto } from '@/models/dto/schedule/res/schedule-res.dto';

import { ErrorResponse } from './error-response.decorator';

export const GetOneScheduleSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '특정 여행일정 가져오기',
		}),
		ApiOkResponse({
			description: '특정 여행일정 가져오기',
			type: ScheduleResDto,
		}),
		ErrorResponse(HttpStatus.NOT_FOUND, [
			GroupErrorResponse['Group-404-1'],
			ScheduleErrorResponse['Schedule-404-1'],
		]),

		ErrorResponse(HttpStatus.FORBIDDEN, [GroupErrorResponse['Group-403-1']]),
	);
};

export const GetScheduleListOwnMemberIdSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '여행일정 리스트 전체 가져오기',
		}),
		ApiOkResponse({
			description: '여행일정 리스트 전체 가져오기',
			type: ScheduleResDto,
		}),

		ErrorResponse(HttpStatus.NOT_FOUND, [GroupErrorResponse['Group-404-1']]),
		ErrorResponse(HttpStatus.FORBIDDEN, [GroupErrorResponse['Group-403-1']]),
	);
};

export const GetSchedulesSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '여행일정 리스트 전체 가져오기',
		}),
		ApiOkResponse({
			description: '여행일정 리스트 전체 가져오기',
			type: ScheduleResDto,
		}),
	);
};

export const CreateToursScheduleSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '특정 그룹의 여행 일정 작성하기',
		}),
		ApiCreatedResponse({
			description: '여행 일정 생성 성공',
			type: ScheduleByIdResDto,
		}),
		ErrorResponse(HttpStatus.NOT_FOUND, [GroupErrorResponse['Group-404-1']]),
		ErrorResponse(HttpStatus.FORBIDDEN, [GroupErrorResponse['Group-403-1']]),
	);
};

export const UpdateToursScheduleSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '특정 그룹의 여행 일정 수정하기',
		}),
		ApiOkResponse({
			description: '여행 일정 수정 성공',
			type: ScheduleByIdResDto,
		}),
		ErrorResponse(HttpStatus.NOT_FOUND, [
			GroupErrorResponse['Group-404-1'],
			ScheduleErrorResponse['Schedule-404-1'],
		]),
		ErrorResponse(HttpStatus.FORBIDDEN, [
			GroupErrorResponse['Group-403-1'],
			ScheduleErrorResponse['Schedule-403-1'],
		]),
	);
};

export const DeleteToursScheduleSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '특정 그룹의 여행 일정 삭제하기',
		}),
		ApiOkResponse({
			description: '여행 일정 삭제 성공',
		}),
		ErrorResponse(HttpStatus.NOT_FOUND, [
			GroupErrorResponse['Group-404-1'],
			ScheduleErrorResponse['Schedule-404-1'],
		]),
		ErrorResponse(HttpStatus.FORBIDDEN, [
			GroupErrorResponse['Group-403-1'],
			ScheduleErrorResponse['Schedule-403-1'],
		]),
	);
};

export const PatchScheduleTitleSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '특정 스케줄 여행제목 수정',
		}),
		ApiOkResponse({
			description: '여행 제목 수정 성공',
		}),
		ErrorResponse(HttpStatus.NOT_FOUND, [
			ScheduleErrorResponse['Schedule-404-1'],
		]),
	);
};
