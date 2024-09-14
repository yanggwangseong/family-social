import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { SearchErrorResponse } from '@/constants/swagger-error-response';

import { ErrorResponse } from './error-response.decorator';

export const GetSearchHistorySwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '검색 기록 가져오기',
		}),
		ApiOkResponse({
			description: '검색 기록 가져오기 성공',
			isArray: true,
			type: String,
		}),

		ErrorResponse(HttpStatus.BAD_REQUEST, [
			SearchErrorResponse['Search-400-1'],
		]),
	);
};

export const DeleteSearchHistorySwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '검색 전체 기록 삭제',
		}),
		ApiOkResponse({
			description: '검색 전체 기록 삭제 성공',
		}),
		ErrorResponse(HttpStatus.BAD_REQUEST, [
			SearchErrorResponse['Search-400-1'],
		]),
	);
};

export const DeleteSearchTermSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '특정 검색 기록 삭제',
		}),
		ApiOkResponse({
			description: '특정 검색 기록 삭제 성공',
		}),
		ErrorResponse(HttpStatus.BAD_REQUEST, [
			SearchErrorResponse['Search-400-1'],
		]),
	);
};
