import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

import { ServiceException } from '../exception/service.exception';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		if (exception instanceof ServiceException) {
			// service-http-exception에서 처리
			throw exception;
		} else {
			console.log(
				'**************** exception을 ServiceException에서 catch 할 수 없는 에러들 ***********',
				exception,
			);
			console.log('**************** host ***********', host);
		}
	}
}
