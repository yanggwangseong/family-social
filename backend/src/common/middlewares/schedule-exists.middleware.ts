import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import { SchedulesService } from '@/api/schedules/schedules.service';
import { ERROR_SCHEDULE_NOT_FOUND } from '@/constants/business-error';

import { EntityNotFoundException } from '../exception/service.exception';

@Injectable()
export class ScheduleExistsMiddleware implements NestMiddleware {
	constructor(private readonly schedulesService: SchedulesService) {}
	async use(req: Request, res: Response, next: NextFunction) {
		const scheduleId = req.params.scheduleId;
		if (!scheduleId) {
			throw EntityNotFoundException(ERROR_SCHEDULE_NOT_FOUND);
		}

		const schema = Joi.string().guid({
			version: ['uuidv4'],
		});

		const { error } = schema.validate(scheduleId);

		if (error) {
			throw EntityNotFoundException(ERROR_SCHEDULE_NOT_FOUND);
		}

		const scheduleExist =
			await this.schedulesService.scheduleExistsByScheduleId(scheduleId);
		if (!scheduleExist) throw EntityNotFoundException(ERROR_SCHEDULE_NOT_FOUND);

		next();
	}
}
