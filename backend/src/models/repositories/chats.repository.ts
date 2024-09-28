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
		groupId?: string,
		qr?: QueryRunner,
	): Promise<string> {
		const chatsRepository = this.getChatsRepository(qr);

		const chatId = uuidv4();

		const insertChat = {
			id: chatId,
			group: groupId ? { id: groupId } : undefined,
			chatType: { chatType },
		};

		await chatsRepository.insert(insertChat);

		return chatId;
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

		return results.map((result) => {
			const { groupId, groupName, groupDescription, groupCoverImage, ...rest } =
				result;
			return {
				...rest,
				group: groupId
					? {
							id: groupId,
							groupName,
							groupDescription,
							groupCoverImage,
					  }
					: null,
			};
		});
	}
	/**
	 * @summary 채팅방 중복 생성 확인
	 * @param memberIds 채팅방 멤버 id 배열
	 * @param chatType 채팅방 타입
	 * @returns 채팅방 존재 여부
	 */
	async findExistingChat(
		memberIds: string[],
		chatType: Union<typeof ChatType>,
	): Promise<ChatEntity | null> {
		return await this.createQueryBuilder('chat')
			.innerJoin('chat.enteredByChats', 'memberChat')
			.where('chat.chatType = :chatType', { chatType })
			.andWhere('memberChat.memberId IN (:...memberIds)', { memberIds })
			.groupBy('chat.id')
			.having('COUNT(DISTINCT memberChat.memberId) = :memberCount', {
				memberCount: memberIds.length,
			})
			.getOne();
	}

	/**
	 * @summary 그룹 채팅방 중복 생성 확인
	 * @description 그룹 채팅방은 그룹 id와 채팅방 타입으로 중복 생성 확인
	 * @param groupId 그룹 id
	 * @param chatType 채팅방 타입
	 * @returns 채팅방 존재 여부
	 */
	async findExistingGroupChat(
		groupId: string,
		chatType: Union<typeof ChatType>,
	): Promise<ChatEntity | null> {
		return await this.createQueryBuilder('chat')
			.select('chat.id, chatType.chatType, group.id')
			.innerJoin('chat.group', 'group')
			.innerJoin('chat.chatType', 'chatType')
			.where('chatType.chatType = :chatType', { chatType })
			.andWhere('group.id = :groupId', { groupId })
			.getOne();
	}
}
