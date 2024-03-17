import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { SchedulesService } from '@/api/schedules/schedules.service';
import { ERROR_NO_PERMISSTION_TO_SCHEDULE } from '@/constants/business-error';

import { ForBiddenException } from '../exception/service.exception';

@Injectable()
export class IsMineScheduleGuard implements CanActivate {
	constructor(private readonly schedulesService: SchedulesService) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest();

		const { sub } = req.user;
		const { scheduleId } = req.params;

		const exist = await this.schedulesService.isMineScheduleExists(
			scheduleId,
			sub,
		);

		if (!exist) throw ForBiddenException(ERROR_NO_PERMISSTION_TO_SCHEDULE);

		return true;
	}
}
