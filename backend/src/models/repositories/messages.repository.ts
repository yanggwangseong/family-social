import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { ICreateMessageArgs } from '@/types/args/message';

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
}
