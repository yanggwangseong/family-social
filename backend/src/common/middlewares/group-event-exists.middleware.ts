import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { GroupEventsService } from '@/api/group-events/group-events.service';
import {
	ERROR_GROUP_EVENT_NOT_FOUND,
	ERROR_UUID_PIPE_MESSAGE,
} from '@/constants/business-error';

import {
	BadRequestServiceException,
	EntityNotFoundException,
} from '../exception/service.exception';

@Injectable()
export class GroupEventExistsMiddleware implements NestMiddleware {
	constructor(private readonly groupEventsService: GroupEventsService) {}
	async use(req: Request, res: Response, next: NextFunction) {
		const groupEventId = req.params.groupEventId;

		if (!groupEventId) {
			throw EntityNotFoundException(ERROR_GROUP_EVENT_NOT_FOUND);
		}

		const schema = z.string().uuid();

		const validationResult = schema.safeParse(groupEventId);

		if (validationResult.success === false) {
			throw BadRequestServiceException(ERROR_UUID_PIPE_MESSAGE);
		}

		const eventExist =
			await this.groupEventsService.groupEventExistsByGroupEventId(
				groupEventId,
			);

		if (!eventExist) throw EntityNotFoundException(ERROR_GROUP_EVENT_NOT_FOUND);

		next();
	}
}
