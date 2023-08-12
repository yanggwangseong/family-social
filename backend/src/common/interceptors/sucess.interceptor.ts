import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface SucessResponse<T> {
	data: T;
	success?: boolean;
}

@Injectable()
export class SuccessInterceptor<T>
	implements NestInterceptor<T, SucessResponse<T>>
{
	intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Observable<SucessResponse<T>> {
		return next.handle().pipe(
			map((data) => {
				const request = context.switchToHttp().getRequest();
				const response = context.switchToHttp().getResponse();
				const statusCode = response.statusCode || 200;

				// 200과 달리 요청에 성공하고 새로운 리소스를 만든 경우에 응답한다.(POST, PUT)
				if (request.method === 'POST' || request.method === 'PUT') {
					//로그인 일때는 제외
					if (request.method === 'POST' && request.path === '/users/signin') {
						response.statusCode = 200;
						return {
							success: true,
							data,
						};
					}
					if (statusCode === 201) {
						return {
							success: true,
							data,
						};
					}
				}

				// if (statusCode === 200) {
				// 	return {
				// 		success: true,
				// 		data,
				// 	};
				// } else if (statusCode === 202) {
				// 	// 클라이언트 요청을 받은 후, 요청은 유효하나 서버가 아직 처리하지 않은 경우에 응답한다. 비동기 작업
				// 	return {
				// 		success: true,
				// 		data,
				// 	};
				// }

				return {
					success: true,
					data,
				};
			}),
		);
	}
}
