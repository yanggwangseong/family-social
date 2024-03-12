import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import { CommentsService } from '@/api/comments/comments.service';
import { ERROR_COMMENT_NOT_FOUND } from '@/constants/business-error';

import { EntityNotFoundException } from '../exception/service.exception';

@Injectable()
export class CommentExistsMiddleware implements NestMiddleware {
	constructor(private readonly commentsService: CommentsService) {}
	async use(req: Request, res: Response, next: NextFunction) {
		const commentId = req.params.commentId;

		if (!commentId) {
			throw EntityNotFoundException(ERROR_COMMENT_NOT_FOUND);
		}

		const schema = Joi.string().guid({
			version: ['uuidv4'],
		});

		const { error } = schema.validate(commentId);

		if (error) {
			throw EntityNotFoundException(ERROR_COMMENT_NOT_FOUND);
		}

		const commentExist = await this.commentsService.commentExistsByCommentId(
			commentId,
		);

		if (!commentExist) throw EntityNotFoundException(ERROR_COMMENT_NOT_FOUND);

		next();
	}
}
