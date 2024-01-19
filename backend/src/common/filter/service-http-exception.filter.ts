import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';

import { ServiceException } from '@/common/exception/service.exception';

@Catch(ServiceException)
export class ServiceHttpExceptionFilter implements ExceptionFilter {
	catch(exception: ServiceException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const request = ctx.getRequest<Request>();
		const response = ctx.getResponse<Response>();

		response
			.status(exception.errorCode.status)
			.json(exception.toHttpExceptionResponse(request.path));
	}
}
