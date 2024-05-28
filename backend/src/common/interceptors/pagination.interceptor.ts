import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { z } from 'zod';

import { ERROR_INTERNAL_SERVER_ERROR } from '@/constants/business-error';
import { PAGINATION_KEY, PaginationEnum } from '@/constants/pagination.const';

import { InternalServerErrorException } from '../exception/service.exception';

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
	constructor(private readonly reflector: Reflector) {}
	intercept(context: ExecutionContext, next: CallHandler<any>) {
		const paginationType: PaginationEnum = this.reflector.getAllAndOverride(
			PAGINATION_KEY,
			[context.getHandler(), context.getClass],
		);
		const schema = z.nativeEnum(PaginationEnum);

		const validationResult = schema.safeParse(paginationType);

		if (!paginationType) {
			throw InternalServerErrorException(ERROR_INTERNAL_SERVER_ERROR);
		}

		if (validationResult.success === false) {
			throw InternalServerErrorException(ERROR_INTERNAL_SERVER_ERROR);
		}

		return next.handle().pipe();
	}
}
