import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { CommentsService } from '@/api/comments/comments.service';
import {
	ERROR_COMMENT_NOT_FOUND,
	ERROR_UUID_PIPE_MESSAGE,
} from '@/constants/business-error';

import {
	BadRequestServiceException,
	EntityNotFoundException,
} from '../exception/service.exception';

@Injectable()
export class CommentExistsMiddleware implements NestMiddleware {
	constructor(private readonly commentsService: CommentsService) {}
	async use(req: Request, res: Response, next: NextFunction) {
		const commentId = req.params.commentId;

		if (!commentId) {
			throw EntityNotFoundException(ERROR_COMMENT_NOT_FOUND);
		}

		const schema = z.string().uuid();

		const validationResult = schema.safeParse(commentId);

		if (validationResult.success === false) {
			throw BadRequestServiceException(ERROR_UUID_PIPE_MESSAGE);
		}

		const commentExist = await this.commentsService.commentExistsByCommentId(
			commentId,
		);

		if (!commentExist) throw EntityNotFoundException(ERROR_COMMENT_NOT_FOUND);

		next();
	}
}
