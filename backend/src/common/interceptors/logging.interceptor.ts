import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, tap } from 'rxjs';

export class LoggingInterceptor implements NestInterceptor {
	constructor(private readonly configService: ConfigService) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const request = context.switchToHttp().getRequest();
		const { path } = request;

		return next.handle().pipe(
			tap((response) => {
				if (
					this.configService.get<string>('NODE_ENV')?.toLowerCase() !== 'test'
				) {
					const requestToResponse: `${number}ms` = `${
						Date.now() - request.now
					}ms`;

					console.log(
						`logging\n${request.method} ${path} ${requestToResponse}\n` +
							`currentTime : ${new Date()}]\n`,
					);
				}
			}),
		);
	}
}
