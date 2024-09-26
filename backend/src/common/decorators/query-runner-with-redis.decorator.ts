import {
	ExecutionContext,
	InternalServerErrorException,
	createParamDecorator,
} from '@nestjs/common';
import { ChainableCommander } from 'ioredis';
import { QueryRunner } from 'typeorm';

export interface QueryRunnerWithRedis {
	queryRunner: QueryRunner;
	redisMulti: ChainableCommander;
}

export const QueryRunnerWithRedisDecorator = createParamDecorator(
	(data: unknown, context: ExecutionContext): QueryRunnerWithRedis => {
		const req = context.switchToHttp().getRequest();

		if (!req.queryRunner || !req.redisMulti) {
			throw new InternalServerErrorException(
				'QueryRunner Decorator를 사용하려면 TransactionWithRedisInterceptor를 적용해야 합니다.',
			);
		}

		return { queryRunner: req.queryRunner, redisMulti: req.redisMulti };
	},
);
