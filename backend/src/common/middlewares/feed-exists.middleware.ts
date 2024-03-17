import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import {
	ERROR_FEED_NOT_FOUND,
	ERROR_UUID_PIPE_MESSAGE,
} from '@/constants/business-error';
import { FeedsRepository } from '@/models/repositories/feeds.repository';

import {
	BadRequestServiceException,
	EntityNotFoundException,
} from '../exception/service.exception';

@Injectable()
export class FeedExistsMiddleware implements NestMiddleware {
	constructor(private readonly feedsRepository: FeedsRepository) {}
	async use(req: Request, res: Response, next: NextFunction) {
		const feedId = req.params.feedId;

		if (!feedId) throw EntityNotFoundException(ERROR_FEED_NOT_FOUND);

		const schema = z.string().uuid();

		const validationResult = schema.safeParse(feedId);

		if (validationResult.success === false) {
			throw BadRequestServiceException(ERROR_UUID_PIPE_MESSAGE);
		}

		const feed = await this.feedsRepository.findFeedById(feedId);

		if (!feed) {
			throw EntityNotFoundException(ERROR_FEED_NOT_FOUND);
		}

		next();
	}
}
