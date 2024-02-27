import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

	async getMemberBelongToChats(memberId: string) {
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
}
