import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { Observable, catchError, tap } from 'rxjs';
import { DataSource } from 'typeorm';

@Injectable()
export class TransactionWithRedisInterceptor implements NestInterceptor {
	constructor(
		private readonly dataSource: DataSource,
		@InjectRedis() private readonly redis: Redis,
	) {}

	async intercept(
		context: ExecutionContext,
		next: CallHandler<any>,
	): Promise<Observable<any>> {
		const req = context.switchToHttp().getRequest();

		const qr = this.dataSource.createQueryRunner();
		const redisMulti = this.redis.multi();

		await qr.connect();
		await qr.startTransaction();

		req.queryRunner = qr;
		req.redisMulti = redisMulti;

		return next.handle().pipe(
			catchError(async (e) => {
				await qr.rollbackTransaction();
				await qr.release();
				redisMulti.discard();

				throw e;
			}),
			tap(async () => {
				await qr.commitTransaction();
				await qr.release();
				await redisMulti.exec();
			}),
		);
	}
}
