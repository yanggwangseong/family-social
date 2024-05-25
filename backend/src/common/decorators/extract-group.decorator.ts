import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { GroupProfileResDto } from '@/models/dto/group/res/group-profile.rest.dto';

export const ExTractGroupDecorator = createParamDecorator(
	(data: keyof GroupProfileResDto, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();

		const group = request.group;

		return data ? group[data] : group;
	},
);
