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

	async getMessagesByChat(chatId: string, memberId: string) {
		return this.repository
			.findOneOrFail({
				select: {
					id: true,
					createdAt: true,
					updatedAt: true,
					messages: {
						id: true,
						createdAt: true,
						updatedAt: true,
						message: true,
						member: {
							id: true,
							username: true,
							profileImage: true,
						},
					},
				},
				where: {
					id: chatId,
				},
				relations: {
					messages: {
						member: true,
					},
				},
			})
			.then((data) => {
				const newMessages = data.messages.map((value) => {
					return {
						...value,
						isMine: memberId === value.member.id ? true : false,
					};
				});
				return {
					...data,
					messages: newMessages,
				};
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
