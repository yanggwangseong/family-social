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
import { IncomingWebhook } from '@slack/webhook';
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
	constructor(
		private readonly httpAdapterHost: HttpAdapterHost,
		private readonly incomingWebhook: IncomingWebhook,
	) {}
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
			const errorLog = `[${ErrorTypeEnum.TYPEORM}][${method}]${originalUrl} ${ip} ${userAgent} - ${exception.message}`;
			winstonLogger.error(errorLog);

			const response = InternalServerErrorException(
				ERROR_INTERNAL_SERVER_ERROR,
			);

			const responseBody = response.toHttpExceptionResponse(
				httpAdapter.getRequestUrl(ctx.getRequest()),
			);

			// sentry
			Sentry.captureException(exception);

			// slack
			this.sendSlackIncomingWebhook(
				errorLog,
				exception.message,
				exception.stack ?? '',
			);

			return this.HttpExceptionResponse(ctx, responseBody, statusCode);
		}

		if (statusCode >= 400 && statusCode < 500) {
			const errorLog = `[${
				ErrorTypeEnum.OTHER
			}][${method}]${originalUrl}(${statusCode}) ${ip} ${userAgent} - ${
				(exception as HttpException).message
			}`;
			winstonLogger.warn(errorLog);
			const response = InternalServerErrorException(
				ERROR_INTERNAL_SERVER_ERROR,
			);

			const responseBody = response.toHttpExceptionResponse(
				httpAdapter.getRequestUrl(ctx.getRequest()),
			);

			Sentry.captureException(exception);

			// slack
			this.sendSlackIncomingWebhook(
				errorLog,
				(exception as HttpException).message,
				(exception as HttpException).stack ?? '',
			);

			return this.HttpExceptionResponse(ctx, responseBody, statusCode);
		} else if (statusCode >= 500) {
			const errorLog = `[${
				ErrorTypeEnum.OTHER
			}][${method}]${originalUrl}(${statusCode}) ${ip} ${userAgent} - ${
				(exception as HttpException).message
			}`;
			winstonLogger.error(errorLog);
			const response = InternalServerErrorException(
				ERROR_INTERNAL_SERVER_ERROR,
			);

			const responseBody = response.toHttpExceptionResponse(
				httpAdapter.getRequestUrl(ctx.getRequest()),
			);

			Sentry.captureException(exception);

			// slack
			this.sendSlackIncomingWebhook(
				errorLog,
				(exception as HttpException).message,
				(exception as HttpException).stack ?? '',
			);

			return this.HttpExceptionResponse(ctx, responseBody, statusCode);
		}

		/**
		 * 그외의 예측 할 수 없는 모든 에러
		 */
		const errorLog = `[${
			ErrorTypeEnum.OTHER
		}][${method}]${originalUrl}(${statusCode}) ${ip} ${userAgent} - ${
			(exception as HttpException).message
		}`;
		winstonLogger.error(errorLog);
		const response = InternalServerErrorException(ERROR_INTERNAL_SERVER_ERROR);

		const responseBody = response.toHttpExceptionResponse(
			httpAdapter.getRequestUrl(ctx.getRequest()),
		);

		Sentry.captureException(exception);

		// slack
		this.sendSlackIncomingWebhook(
			errorLog,
			(exception as HttpException).message,
			(exception as HttpException).stack ?? '',
		);

		return this.HttpExceptionResponse(ctx, responseBody, statusCode);
	}

	private HttpExceptionResponse(
		ctx: HttpArgumentsHost,
		responseBody: HttpExceptionResponse,
		statusCode: number,
	) {
		const { httpAdapter } = this.httpAdapterHost;

		httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
	}

	private sendSlackIncomingWebhook(text: string, title: string, value: string) {
		this.incomingWebhook.send({
			attachments: [
				{
					color: 'danger',
					text,
					fields: [
						{
							title,
							value,
							short: false,
						},
					],
					ts: Math.floor(new Date().getTime() / 1000).toString(),
				},
			],
		});
	}
}
