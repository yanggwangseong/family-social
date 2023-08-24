import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
	(
		data: keyof { sub: string; username: string; refreshToken?: string },
		ctx: ExecutionContext,
	) => {
		const request = ctx.switchToHttp().getRequest();
		const user = request.user;

		return data ? user[data] : user;
	},
);
