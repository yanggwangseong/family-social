import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { ERROR_FEED_NOT_FOUND } from '@/constants/business-error';
import { FeedsRepository } from '@/models/repositories/feeds.repository';

import { EntityNotFoundException } from '../exception/service.exception';

@Injectable()
export class FeedExistsMiddleware implements NestMiddleware {
	constructor(private readonly feedsRepository: FeedsRepository) {}
	async use(req: Request, res: Response, next: NextFunction) {
		const feedId = req.params.feedId;
		console.log('****=', feedId);

		if (!feedId) {
			throw EntityNotFoundException(ERROR_FEED_NOT_FOUND);
		}

		const feed = await this.feedsRepository.findFeedById(feedId);

		if (!feed) {
			throw EntityNotFoundException(ERROR_FEED_NOT_FOUND);
		}

		next();
	}
}
