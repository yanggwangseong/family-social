import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IGetMemberBelongToChatsRes } from '@/types/args/member-chat';

import { ChatMembersResDto } from '../dto/member-chat/res/chat-members-res.dto';
import { MemberChatEntity } from '../entities/member-chat.entity';

@Injectable()
export class MemberChatRepository extends Repository<MemberChatEntity> {
	constructor(
		@InjectRepository(MemberChatEntity)
		private readonly repository: Repository<MemberChatEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async createMembersEnteredByChat(
		chatId: string,
		memberIds: string[],
	): Promise<void> {
		await this.repository.insert(
			memberIds.map((value) => {
				return {
					chatId,
					memberId: value,
				};
			}),
		);
	}

	async getMemberBelongToChats(
		memberId: string,
	): Promise<IGetMemberBelongToChatsRes[]> {
		return await this.repository.find({
			select: {
				memberId: true,
				chat: {
					id: true,
					createdAt: true,
				},
			},
			where: {
				memberId,
			},
			relations: {
				chat: true,
			},
		});
	}

	async getMembersAndCountByChat(
		chatId: string,
	): Promise<[ChatMembersResDto[], number]> {
		return await this.repository.findAndCount({
			select: {
				memberId: true,
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
		});
	}
}
