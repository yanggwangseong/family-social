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
		const ctx = host.switchToHttp();
		const { httpAdapter } = this.httpAdapterHost;
		const request = ctx.getRequest<Request>();

		const { ip, method, originalUrl } = request;
		const userAgent = request.get('user-agent');

		const statusCode = this.getStatusCode(exception);
		const errorType =
			exception instanceof QueryFailedError
				? ErrorTypeEnum.TYPEORM
				: ErrorTypeEnum.OTHER;
		const errorLog = this.formatErrorLog(
			errorType,
			method,
			originalUrl,
			statusCode,
			ip,
			userAgent,
			exception,
		);
		const responseBody = this.createResponseBody(ctx, httpAdapter);

		this.logError(errorLog, statusCode);
		this.notifySentry(exception);
		this.notifySlack(errorLog, exception);

		this.respond(ctx, responseBody, statusCode);
	}

	private getStatusCode(exception: unknown): number {
		return exception instanceof HttpException
			? exception.getStatus()
			: HttpStatus.INTERNAL_SERVER_ERROR;
	}

	private formatErrorLog(
		errorType: ErrorTypeEnum,
		method: string,
		originalUrl: string,
		statusCode: number,
		ip: string,
		userAgent: string | undefined,
		exception: unknown,
	): string {
		const message =
			exception instanceof HttpException
				? exception.message
				: String(exception);
		return `[${errorType}][${method}]${originalUrl}(${statusCode}) ${ip} ${userAgent} - ${message}`;
	}

	private createResponseBody(
		ctx: HttpArgumentsHost,
		httpAdapter: any,
	): HttpExceptionResponse {
		const response = InternalServerErrorException(ERROR_INTERNAL_SERVER_ERROR);
		return response.toHttpExceptionResponse(
			httpAdapter.getRequestUrl(ctx.getRequest()),
		);
	}

	private logError(errorLog: string, statusCode: number): void {
		if (statusCode >= 400 && statusCode < 500) {
			winstonLogger.warn(errorLog);
		} else {
			winstonLogger.error(errorLog);
		}
	}

	private notifySentry(exception: unknown): void {
		if (
			exception instanceof HttpException ||
			exception instanceof QueryFailedError
		) {
			Sentry.captureException(exception);
		}
	}

	private notifySlack(errorLog: string, exception: unknown): void {
		if (process.env.NODE_ENV === 'production') {
			this.incomingWebhook.send({
				attachments: [
					{
						color: 'danger',
						text: errorLog,
						fields: [
							{
								title:
									exception instanceof HttpException
										? exception.message
										: 'Exception',
								value:
									exception instanceof Error
										? exception.stack || ''
										: String(exception),
								short: false,
							},
						],
						ts: Math.floor(new Date().getTime() / 1000).toString(),
					},
				],
			});
		}
	}

	private respond(
		ctx: HttpArgumentsHost,
		responseBody: HttpExceptionResponse,
		statusCode: number,
	): void {
		const { httpAdapter } = this.httpAdapterHost;
		httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
	}
}
