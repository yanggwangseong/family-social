import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { MessagesRepository } from '@/models/repositories/messages.repository';
import { ICreateMessageArgs } from '@/types/args/message';

@Injectable()
export class MessagesService {
	constructor(private readonly messagesRepository: MessagesRepository) {}

	async createMessage(createMessageArgs: ICreateMessageArgs) {
		const newMessage = this.messagesRepository.create({
			id: uuidv4(),
			...createMessageArgs,
		});
		return await this.messagesRepository.createMessage(newMessage);
	}
}
