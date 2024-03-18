import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { ChatsService } from '@/api/chats/chats.service';
import {
	ERROR_CHAT_NOT_FOUND,
	ERROR_UUID_PIPE_MESSAGE,
} from '@/constants/business-error';

import {
	BadRequestServiceException,
	EntityNotFoundException,
} from '../exception/service.exception';

@Injectable()
export class ChatExistsMiddleware implements NestMiddleware {
	constructor(private readonly chatsService: ChatsService) {}
	async use(req: Request, res: Response, next: NextFunction) {
		const chatId = req.params.chatId;

		if (!chatId) throw EntityNotFoundException(ERROR_CHAT_NOT_FOUND);

		const schema = z.string().uuid();

		const validationResult = schema.safeParse(chatId);

		if (validationResult.success === false) {
			throw BadRequestServiceException(ERROR_UUID_PIPE_MESSAGE);
		}

		const chatExist = await this.chatsService.checkIfChatExists(chatId);

		if (!chatExist) throw EntityNotFoundException(ERROR_CHAT_NOT_FOUND);

		next();
	}
}
