import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import {
	ERROR_INVALID_TOKEN,
	ERROR_TOKEN_EXPIRED,
} from '@/constants/business-error';

import {
	BadRequestServiceException,
	UnAuthOrizedException,
} from '../exception/service.exception';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
	handleRequest<TUser = any>(
		err: any,
		user: any,
		info: any,
		context: ExecutionContext,
		status?: any,
	): TUser {
		if (info instanceof Error) {
			if (info.name === 'TokenExpiredError' && info.message === 'jwt expired') {
				throw UnAuthOrizedException(ERROR_TOKEN_EXPIRED);
			} else {
				throw BadRequestServiceException(ERROR_INVALID_TOKEN);
			}
		}
		return super.handleRequest(err, user, info, context, status);
	}
}
