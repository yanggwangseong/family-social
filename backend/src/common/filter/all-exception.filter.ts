import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { ServiceException } from '../exception/service.exception';
import { winstonLogger } from '../logger/winston';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
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
		const response = ctx.getResponse<Response>();
		const { ip, method, originalUrl } = request;
		const userAgent = request.get('user-agent');
		const { statusCode } = response;

		if (statusCode >= 400 && statusCode < 500)
			winstonLogger.warn(
				`[${method}]${originalUrl}(${statusCode}) ${ip} ${userAgent} ${
					(exception as HttpException).message
				}`,
			);
		else if (statusCode >= 500)
			winstonLogger.error(
				`[${method}]${originalUrl}(${statusCode}) ${ip} ${userAgent} ${
					(exception as HttpException).message
				}`,
			);
	}
}
