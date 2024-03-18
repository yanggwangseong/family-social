import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { FeedsService } from '@/api/feeds/feeds.service';
import { ERROR_NO_PERMISSTION_TO_FEED } from '@/constants/business-error';

import { ForBiddenException } from '../exception/service.exception';

@Injectable()
export class IsMineFeedGuard implements CanActivate {
	constructor(private readonly feedsService: FeedsService) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest();

		const { sub } = req.user;
		const { feedId } = req.params;

		const exists = await this.feedsService.isMineFeedExists(feedId, sub);

		if (!exists) throw ForBiddenException(ERROR_NO_PERMISSTION_TO_FEED);

		return true;
	}
}
