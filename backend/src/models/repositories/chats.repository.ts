import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { ChatType, Union } from '@/types';

import { MemberBelongToChatsResDto } from '../dto/member-chat/res/member-belong-to-chats-res.dto';
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

	async createChat(
		chatType: Union<typeof ChatType>,
		qr?: QueryRunner,
	): Promise<{ id: string }> {
		const chatsRepository = this.getChatsRepository(qr);
		const chat = await chatsRepository.insert({
			chatType: {
				chatType,
			},
			id: uuidv4(),
		});

		return await chatsRepository.findOneOrFail({
			where: {
				id: chat.identifiers[0].id,
			},
		});
	}

	async getMemberBelongToChats(
		memberId: string,
	): Promise<MemberBelongToChatsResDto[]> {
		const query = this.repository
			.createQueryBuilder('c')
			.leftJoinAndSelect('c.enteredByChats', 'mc')
			.leftJoinAndSelect('c.chatType', 'ct')
			.leftJoinAndSelect('c.group', 'g')
			.where('mc.memberId = :memberId', { memberId })
			.select([
				'c.id as "chatId"',
				'c.createdAt as "chatCreateAt"',
				'ct.chatType as "chatType"',
				'g.id as "groupId"',
				'mc.memberId as "targetMemberId"',
				'g.groupName as "groupName"',
				'g.groupDescription as "groupDescription"',
				'g.groupCoverImage as "groupCoverImage"',
			]);

		const results = await query.getRawMany();

		return results.map((result) => ({
			...result,
			group: result.groupId
				? {
						id: result.groupId,
						groupName: result.groupName,
						groupDescription: result.groupDescription,
						groupCoverImage: result.groupCoverImage,
				  }
				: null,
		}));
	}
}
