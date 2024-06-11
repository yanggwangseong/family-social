import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { GroupsService } from '@/api/groups/groups.service';
import { ERROR_DUPLICATE_GROUP_NAME } from '@/constants/business-error';

import { EntityConflictException } from '../exception/service.exception';

@Injectable()
export class CheckDuplicateGroupNameGuard implements CanActivate {
	constructor(private readonly groupsService: GroupsService) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();

		const { groupName } = request.body;

		const { sub } = request.user;

		const count = await this.groupsService.checkDuplicateGroupName(
			sub,
			groupName,
		);

		if (count > 0) {
			throw EntityConflictException(ERROR_DUPLICATE_GROUP_NAME);
		}

		return true;
	}
}
