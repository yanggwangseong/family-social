import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

import { ChatMembersResDto } from '../dto/member-chat/res/chat-members-res.dto';
import { MemberBelongToChatsResDto } from '../dto/member-chat/res/member-belong-to-chats-res.dto';
import { MemberChatEntity } from '../entities/member-chat.entity';

@Injectable()
export class MemberChatRepository extends Repository<MemberChatEntity> {
	constructor(
		@InjectRepository(MemberChatEntity)
		private readonly repository: Repository<MemberChatEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	getMemberChatRepository(qr?: QueryRunner) {
		return qr
			? qr.manager.getRepository<MemberChatEntity>(MemberChatEntity)
			: this.repository;
	}

	async createMembersEnteredByChat(
		chatId: string,
		memberIds: string[],
		qr?: QueryRunner,
	): Promise<void> {
		const memberChatRepository = this.getMemberChatRepository(qr);

		await memberChatRepository.insert(
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
	): Promise<
		Omit<
			MemberBelongToChatsResDto,
			'chatMembers' | 'joinMemberCount' | 'recentMessage'
		>[]
	> {
		return await this.repository
			.find({
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
			})
			.then((data) => {
				return data.map((value) => {
					return {
						targetMemberId: value.memberId,
						chatId: value.chat.id,
						chatCreateAt: value.chat.createdAt.toISOString(),
					};
				});
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
