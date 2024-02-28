import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { ICreateMessageArgs } from '@/types/args/message';

import { RecentMessageResDto } from '../dto/message/res/recent-message-res.dto';
import { MessageEntity } from '../entities/message.entity';

@Injectable()
export class MessagesRepository extends Repository<MessageEntity> {
	constructor(
		@InjectRepository(MessageEntity)
		private readonly repository: Repository<MessageEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async createMessage(createMessageArgs: ICreateMessageArgs) {
		const message = await this.repository.insert({
			id: uuidv4(),
			...createMessageArgs,
		});

		return await this.repository
			.findOneOrFail({
				select: {
					chat: {
						id: true,
					},
				},
				where: {
					id: message.identifiers[0].id,
				},
				relations: {
					chat: true,
				},
			})
			.then((data) => {
				return {
					chatId: data.chat.id,
				};
			});
	}

	async getRecentMessageByChat(chatId: string): Promise<RecentMessageResDto> {
		return await this.repository.findOneOrFail({
			select: {
				id: true,
				createdAt: true,
				chatId: true,
				memberId: true,
				message: true,
			},
			where: {
				chatId,
			},
			order: {
				createdAt: 'DESC',
			},
		});
	}

	async getMessagesByChat(chatId: string, memberId: string) {
		return this.repository
			.find({
				select: {
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
				where: {
					chatId,
				},
				relations: {
					member: true,
				},
			})
			.then((data) => {
				return data.map((value) => {
					return {
						...value,
						isMine: memberId === value.member.id ? true : false,
					};
				});
			});
	}
}
