import { Injectable } from '@nestjs/common';

import { ChatsRepository } from '@/models/repositories/chats.repository';

@Injectable()
export class ChatsService {
	constructor(private readonly chatsRepository: ChatsRepository) {}
}
