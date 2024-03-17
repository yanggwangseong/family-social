import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { SchedulesService } from '@/api/schedules/schedules.service';
import {
	ERROR_SCHEDULE_NOT_FOUND,
	ERROR_UUID_PIPE_MESSAGE,
} from '@/constants/business-error';

import {
	BadRequestServiceException,
	EntityNotFoundException,
} from '../exception/service.exception';

@Injectable()
export class ScheduleExistsMiddleware implements NestMiddleware {
	constructor(private readonly schedulesService: SchedulesService) {}
	async use(req: Request, res: Response, next: NextFunction) {
		const scheduleId = req.params.scheduleId;
		if (!scheduleId) {
			throw EntityNotFoundException(ERROR_SCHEDULE_NOT_FOUND);
		}

		const schema = z.string().uuid();

		const validationResult = schema.safeParse(scheduleId);

		if (validationResult.success === false) {
			throw BadRequestServiceException(ERROR_UUID_PIPE_MESSAGE);
		}

		const scheduleExist =
			await this.schedulesService.scheduleExistsByScheduleId(scheduleId);

		if (!scheduleExist) throw EntityNotFoundException(ERROR_SCHEDULE_NOT_FOUND);

		next();
	}
}
