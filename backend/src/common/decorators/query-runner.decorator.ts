import {
	ExecutionContext,
	InternalServerErrorException,
	createParamDecorator,
} from '@nestjs/common';
import { QueryRunner } from 'typeorm';

export const QueryRunnerDecorator = createParamDecorator(
	(data: unknown, context: ExecutionContext): QueryRunner => {
		const req = context.switchToHttp().getRequest();

		if (!req.queryRunner) {
			throw new InternalServerErrorException(
				'QueryRunner Decorator를 사용하려면 TransactionInterceptor를 적용해야 합니다.',
			);
		}

		return req.queryRunner;
	},
);
