import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
} from '@nestjs/common';
import { Request } from 'express';
import { QueryFailedError } from 'typeorm';

import { ERROR_INTERNAL_SERVER_ERROR } from '@/constants/business-error';

import {
	InternalServerErrorException,
	ServiceException,
} from '../exception/service.exception';
import { winstonLogger } from '../logger/winston';

export enum ErrorTypeEnum {
	TYPEORM = 'TYPEORM',
	OTHER = 'OTHER',
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		/**
		 * 사용자 정의 exception 일때 throw
		 */
		if (exception instanceof ServiceException) {
			// service-http-exception에서 처리
			throw exception;
		}

		/**
		 * validation, guard, serviceException 등 개발자가 정의 하지 않은 에러
		 * TypeOrm 에러나 예측하지 못한 에러들
		 * 1. winston Log 파일에 기록
		 * 2. slack 웹훅을 통한 실시간 알림
		 */
		const ctx = host.switchToHttp();
		const request = ctx.getRequest<Request>();

		const { ip, method, originalUrl } = request;
		const userAgent = request.get('user-agent');

		if (exception instanceof QueryFailedError) {
			winstonLogger.error(
				`[${ErrorTypeEnum.TYPEORM}][${method}]${originalUrl} ${ip} ${userAgent} - ${exception.message}`,
			);

			throw InternalServerErrorException(ERROR_INTERNAL_SERVER_ERROR);
		}

		const statusCode =
			exception instanceof HttpException ? exception.getStatus() : 500;

		if (statusCode >= 400 && statusCode < 500)
			winstonLogger.warn(
				`[${
					ErrorTypeEnum.OTHER
				}][${method}]${originalUrl}(${statusCode}) ${ip} ${userAgent} - ${
					(exception as HttpException).message
				}`,
			);
		else if (statusCode >= 500) {
			winstonLogger.error(
				`[${
					ErrorTypeEnum.OTHER
				}][${method}]${originalUrl}(${statusCode}) ${ip} ${userAgent} - ${
					(exception as HttpException).message
				}`,
			);
		}

		throw InternalServerErrorException(ERROR_INTERNAL_SERVER_ERROR);
	}
}
