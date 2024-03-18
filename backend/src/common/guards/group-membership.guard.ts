import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { GroupsService } from '@/api/groups/groups.service';
import { ERROR_NO_PERMISSTION_TO_GROUP } from '@/constants/business-error';

import { ForBiddenException } from '../exception/service.exception';

@Injectable()
export class GroupMemberShipGuard implements CanActivate {
	constructor(private readonly groupsService: GroupsService) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest();

		const { sub } = req.user;
		const { groupId } = req.params;

		const exist = await this.groupsService.memberShipOfGroupExists(
			groupId,
			sub,
		);

		if (!exist) throw ForBiddenException(ERROR_NO_PERMISSTION_TO_GROUP);

		return true;
	}
}
