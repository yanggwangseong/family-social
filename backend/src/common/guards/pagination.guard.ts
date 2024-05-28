import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { z } from 'zod';

import { ERROR_INTERNAL_SERVER_ERROR } from '@/constants/business-error';
import { PAGINATION_KEY, PaginationEnum } from '@/constants/pagination.const';

import { InternalServerErrorException } from '../exception/service.exception';

@Injectable()
export class PaginationGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}
	canActivate(context: ExecutionContext) {
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

		return true;
	}
}
