import { Injectable } from '@nestjs/common';

import { MessagesRepository } from '@/models/repositories/messages.repository';

@Injectable()
export class MessagesService {
	constructor(private readonly messagesRepository: MessagesRepository) {}
}
