import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { FamsService } from '@/api/fams/fams.service';
import { ERROR_MAIN_ROLE_GROUP_LIMIT } from '@/constants/business-error';

import { BadRequestServiceException } from '../exception/service.exception';

@Injectable()
export class LimitMainRoleGroupGuard implements CanActivate {
	constructor(private readonly famsService: FamsService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const { sub } = request.user;

		const mainRoleGroupCount = await this.famsService.getMainRoleGroupCount(
			sub,
		);

		if (mainRoleGroupCount >= 10) {
			throw BadRequestServiceException(ERROR_MAIN_ROLE_GROUP_LIMIT);
		}

		return true;
	}
}
