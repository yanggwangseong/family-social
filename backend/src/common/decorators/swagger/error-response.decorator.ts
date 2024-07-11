import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

import { ServiceException } from '@/common/exception/service.exception';
import { HttpExceptionResponse } from '@/models/dto/error/error-common-res.dto';
import { makeInstanceByApiProperty } from '@/utils/makeInstanceByApiProperty';

export interface ErrorResponseOption {
	/**
	 * ServiceHttpExceptionFilter에서 ServiceException를 호출 하는 커스텀 http함수
	 * 예시 : BadRequestServiceException
	 */
	model: (message?: string) => ServiceException;
	/**
	 * 예시의 제목을 적습니다
	 */
	exampleTitle: string;
	/**
	 * 서비스 레이어에서 적었던 오류 메시지를 기술합니다.
	 */
	message: string | Record<string, Array<string>>;
	/**
	 * 어떠한 상황일 때 오류가나는지 기술합니다.
	 */
	exampleDescription: string;
	/**
	 * 에러 코드에 대해 기술합니다.
	 */
	code?: string;
}

export const ErrorResponse = (
	StatusCode: HttpStatus,
	errorResponseOptions: ErrorResponseOption[],
) => {
	const examples = errorResponseOptions
		.map((error: ErrorResponseOption) => {
			//let innerErrorDto;

			if (typeof error.message !== 'string') {
				throw Error('http오류는 넘겨줄때 string 타입으로 주셔야합니다.');
			}

			// innerErrorDto = new HttpExceptionErrorResponseDto(
			// 	StatusCode,
			// 	error.model.name,
			// 	error.message,
			// 	error.code,
			// );

			const commonErrorInstance =
				makeInstanceByApiProperty<HttpExceptionResponse>(HttpExceptionResponse);
			commonErrorInstance.success = false;
			commonErrorInstance.timestamp = new Date().toISOString();
			commonErrorInstance.message = error.message;
			commonErrorInstance.status = StatusCode;
			//commonErrorInstance.error = innerErrorDto;
			return {
				[error.exampleTitle]: {
					value: commonErrorInstance,
					description: error.exampleDescription,
				},
			};
		})
		.reduce(function (result, item) {
			Object.assign(result, item);
			return result;
		}, {}); // null 값 있을경우 필터링

	return applyDecorators(
		ApiExtraModels(HttpExceptionResponse),
		ApiResponse({
			status: StatusCode,
			content: {
				'application/json': {
					schema: {
						additionalProperties: {
							$ref: getSchemaPath(HttpExceptionResponse),
						},
						//oneOf: [{ $ref: getSchemaPath(HttpExceptionResponse) }],
					},
					examples: examples,
				},
			},
		}),
	);
};
