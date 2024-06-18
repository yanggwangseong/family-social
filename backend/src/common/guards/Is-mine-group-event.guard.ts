import { CanActivate, ExecutionContext } from '@nestjs/common';

import { GroupEventsService } from '@/api/group-events/group-events.service';
import { ERROR_NO_PERMISSTION_TO_GROUP_EVENT } from '@/constants/business-error';

import { ForBiddenException } from '../exception/service.exception';

export class IsMineGroupEventGaurd implements CanActivate {
	constructor(private readonly groupEventsService: GroupEventsService) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest();

		const { sub } = req.user;
		const { groupEventId } = req.params;

		const exists = await this.groupEventsService.isMineGroupEventExists(
			groupEventId,
			sub,
		);

		if (!exists) throw ForBiddenException(ERROR_NO_PERMISSTION_TO_GROUP_EVENT);

		return true;
	}
}
