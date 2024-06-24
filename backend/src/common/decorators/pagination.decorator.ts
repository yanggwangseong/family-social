import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { InternalServerErrorException } from '../exception/service.exception';

export const PaginationDecorator = createParamDecorator(
	(data: unknown, context: ExecutionContext) => {
		const req = context.switchToHttp().getRequest();

		if (!req.pagination) {
			throw InternalServerErrorException(
				'Pagination Decorator를 사용하려면 PaginationInterceptor를 적용해야 합니다.',
			);
		}

		return req.pagination;
	},
);
