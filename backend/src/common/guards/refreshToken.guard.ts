import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
	handleRequest<TUser = any>(
		err: any,
		user: any,
		info: any,
		context: ExecutionContext,
		status?: any,
	): TUser {
		return super.handleRequest(err, user, info, context, status);
	}
}
