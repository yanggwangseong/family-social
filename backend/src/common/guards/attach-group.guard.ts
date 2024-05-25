import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { GroupsService } from '@/api/groups/groups.service';

@Injectable()
export class AttachGroupGuard implements CanActivate {
	constructor(private readonly groupsService: GroupsService) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest();

		const { groupId } = req.params;

		const existsGroup = await this.groupsService.findGroupByIdOrThrow(groupId);

		req.group = existsGroup;

		return true;
	}
}
