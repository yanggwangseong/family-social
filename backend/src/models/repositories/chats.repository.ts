import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { ChatEntity } from '../entities/chat.entity';

@Injectable()
export class ChatsRepository extends Repository<ChatEntity> {
	constructor(
		@InjectRepository(ChatEntity)
		private readonly repository: Repository<ChatEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async getMessagesByChat(chatId: string) {
		return this.repository.findOne({
			where: {
				id: chatId,
			},
			relations: {
				messages: true,
			},
		});
	}

	async createChat(): Promise<{ id: string }> {
		const chat = await this.repository.insert({
			id: uuidv4(),
		});

		return await this.repository.findOneOrFail({
			where: {
				id: chat.identifiers[0].id,
			},
		});
	}
}
