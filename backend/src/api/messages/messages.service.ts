import { Injectable } from '@nestjs/common';

import { MessagesRepository } from '@/models/repositories/messages.repository';
import { ICreateMessageArgs } from '@/types/args/message';

@Injectable()
export class MessagesService {
	constructor(private readonly messagesRepository: MessagesRepository) {}

	async createMessage(createMessageArgs: ICreateMessageArgs) {
		return this.messagesRepository.createMessage(createMessageArgs);
	}
}
