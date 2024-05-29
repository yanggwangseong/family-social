import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map } from 'rxjs';
import { ObjectLiteral } from 'typeorm';
import { z } from 'zod';

import { ERROR_INTERNAL_SERVER_ERROR } from '@/constants/business-error';
import { PAGINATION_KEY, PaginationEnum } from '@/constants/pagination.const';

import { InternalServerErrorException } from '../exception/service.exception';
import { BasicPaginationStrategy } from '../strategies/basic-pagination.strategy';
import { Pagination } from '../strategies/context/pagination';
import { CursorPaginationStrategy } from '../strategies/cusor-pagination.strategy';

@Injectable()
export class PaginationInterceptor<T extends ObjectLiteral>
	implements NestInterceptor
{
	constructor(
		private readonly reflector: Reflector,
		private readonly pagination: Pagination<T>,
	) {}

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

		//const pagination = new Pagination();
		this.setPaginationStrategy(this.pagination, paginationType);

		return next.handle().pipe(
			map((item) => {
				return paginationType === PaginationEnum.BASIC
					? {
							list: item.list,
							page: item.page,
							totalPage: Math.ceil(item.count / item.take),
					  }
					: {
							data: true,
					  };
			}),
		);
	}

	private setPaginationStrategy(
		pagination: Pagination<T>,
		paginationType: PaginationEnum,
	) {
		paginationType === PaginationEnum.BASIC
			? pagination.setStrategy(new BasicPaginationStrategy())
			: pagination.setStrategy(new CursorPaginationStrategy());
	}
}
