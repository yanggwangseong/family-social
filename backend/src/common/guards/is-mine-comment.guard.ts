import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { CommentsService } from '@/api/comments/comments.service';
import { ERROR_NO_PERMISSTION_TO_COMMENT } from '@/constants/business-error';

import { ForBiddenException } from '../exception/service.exception';

@Injectable()
export class IsMineCommentGuard implements CanActivate {
	constructor(private readonly commentsService: CommentsService) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest();

		const { sub } = req.user;
		const { commentId } = req.params;

		const exists = await this.commentsService.isMineCommentExists(
			commentId,
			sub,
		);

		if (!exists) throw ForBiddenException(ERROR_NO_PERMISSTION_TO_COMMENT);

		return true;
	}
}
