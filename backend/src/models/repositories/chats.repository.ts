import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
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

	getChatsRepository(qr?: QueryRunner) {
		return qr
			? qr.manager.getRepository<ChatEntity>(ChatEntity)
			: this.repository;
	}

	async createChat(qr?: QueryRunner): Promise<{ id: string }> {
		if (!qr) console.log('qr notfound');
		const chatsRepository = this.getChatsRepository(qr);

		const chat = await chatsRepository.insert({
			id: uuidv4(),
		});

		return await chatsRepository.findOneOrFail({
			where: {
				id: chat.identifiers[0].id,
			},
		});
	}
}
