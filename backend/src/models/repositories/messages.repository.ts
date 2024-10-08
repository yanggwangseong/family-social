import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OverrideInsertFeild } from '@/types/repository';

import { MessagesByChatResDto } from '../dto/message/res/messages-by-chat-res.dto';
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

	async createMessage(
		overrideInsertFeilds: OverrideInsertFeild<MessageEntity>,
	) {
		const message = await this.repository.insert(overrideInsertFeilds);

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

	async getRecentMessageByChat(
		chatId: string,
	): Promise<RecentMessageResDto | null> {
		return await this.repository
			.findOne({
				select: {
					id: true,
					createdAt: true,
					chatId: true,
					memberId: true,
					message: true,
					member: {
						username: true,
						email: true,
						profileImage: true,
					},
				},
				where: {
					chatId,
				},
				relations: {
					member: true,
				},
				order: {
					createdAt: 'DESC',
				},
			})
			.then((data) => {
				if (!data) {
					return null;
				}

				return {
					id: data.id,
					createdAt: data.createdAt,
					chatId: data.chatId,
					memberId: data.memberId,
					message: data.message,
					memberName: data.member.username,
					memberEmail: data.member.email,
					memberProfileImage: data.member.profileImage,
				};
			});
	}

	async getMessagesByChat(
		chatId: string,
		memberId: string,
	): Promise<MessagesByChatResDto[]> {
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
				order: {
					createdAt: 'ASC',
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
