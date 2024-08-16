import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { HttpAdapterHost } from '@nestjs/core';
import * as Sentry from '@sentry/nestjs';
import { Request } from 'express';
import { QueryFailedError } from 'typeorm';

import { ERROR_INTERNAL_SERVER_ERROR } from '@/constants/business-error';
import { HttpExceptionResponse } from '@/models/dto/error/error-common-res.dto';

import { InternalServerErrorException } from '../exception/service.exception';
import { winstonLogger } from '../logger/winston';

export enum ErrorTypeEnum {
	TYPEORM = 'TYPEORM',
	OTHER = 'OTHER',
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
	constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
	catch(exception: unknown, host: ArgumentsHost) {
		/**
		 * validation, guard, serviceException 등 개발자가 정의 하지 않은 에러
		 * TypeOrm 에러나 예측하지 못한 에러들
		 * 1. winston Log 파일에 기록
		 * 2. slack 웹훅을 통한 실시간 알림
		 */
		const ctx = host.switchToHttp();
		const { httpAdapter } = this.httpAdapterHost;
		const request = ctx.getRequest<Request>();

		const { ip, method, originalUrl } = request;
		const userAgent = request.get('user-agent');

		const statusCode =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		if (exception instanceof QueryFailedError) {
			winstonLogger.error(
				`[${ErrorTypeEnum.TYPEORM}][${method}]${originalUrl} ${ip} ${userAgent} - ${exception.message}`,
			);

			const response = InternalServerErrorException(
				ERROR_INTERNAL_SERVER_ERROR,
			);

			const responseBody = response.toHttpExceptionResponse(
				httpAdapter.getRequestUrl(ctx.getRequest()),
			);

			Sentry.captureException(exception);

			return this.HttpExceptionResponse(ctx, responseBody, statusCode);
		}

		if (statusCode >= 400 && statusCode < 500) {
			winstonLogger.warn(
				`[${
					ErrorTypeEnum.OTHER
				}][${method}]${originalUrl}(${statusCode}) ${ip} ${userAgent} - ${
					(exception as HttpException).message
				}`,
			);
			const response = InternalServerErrorException(
				ERROR_INTERNAL_SERVER_ERROR,
			);

			const responseBody = response.toHttpExceptionResponse(
				httpAdapter.getRequestUrl(ctx.getRequest()),
			);

			Sentry.captureException(exception);

			return this.HttpExceptionResponse(ctx, responseBody, statusCode);
		} else if (statusCode >= 500) {
			winstonLogger.error(
				`[${
					ErrorTypeEnum.OTHER
				}][${method}]${originalUrl}(${statusCode}) ${ip} ${userAgent} - ${
					(exception as HttpException).message
				}`,
			);
			const response = InternalServerErrorException(
				ERROR_INTERNAL_SERVER_ERROR,
			);

			const responseBody = response.toHttpExceptionResponse(
				httpAdapter.getRequestUrl(ctx.getRequest()),
			);

			Sentry.captureException(exception);

			return this.HttpExceptionResponse(ctx, responseBody, statusCode);
		}
	}

	private HttpExceptionResponse(
		ctx: HttpArgumentsHost,
		responseBody: HttpExceptionResponse,
		statusCode: number,
	) {
		const { httpAdapter } = this.httpAdapterHost;

		httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
	}
}
