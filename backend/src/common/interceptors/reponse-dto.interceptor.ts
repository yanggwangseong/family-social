import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

import { RESPONSE_DTO_KEY } from '@/constants/response-dto.const';

@Injectable()
export class ResponseDtoInterceptor<T> implements NestInterceptor {
	constructor(private readonly reflector: Reflector) {}

	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<T> {
		const responseDtoClass: ClassConstructor<T> =
			this.reflector.getAllAndOverride(RESPONSE_DTO_KEY, [
				context.getHandler(),
				context.getClass,
			]);

		return next.handle().pipe(
			map((item) => {
				const result = plainToInstance(responseDtoClass, item);

				return result;
			}),
		);
	}
}
