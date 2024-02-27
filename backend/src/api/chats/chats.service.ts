import { Injectable } from '@nestjs/common';

import { ChatCreateReqDto } from '@/models/dto/chat/req/chat-create-req.dto';
import { ChatsRepository } from '@/models/repositories/chats.repository';
import { MemberChatRepository } from '@/models/repositories/member-chat.repository';

@Injectable()
export class ChatsService {
	constructor(
		private readonly chatsRepository: ChatsRepository,
		private readonly memberChatRepository: MemberChatRepository,
	) {}

	async getMemberBelongToChats(memberId: string) {
		const chat = await this.memberChatRepository.getMemberBelongToChats(
			memberId,
		);

		const result = await Promise.all(
			chat.map(async (item) => {
				const chatMembers = await this.memberChatRepository.getMembersByChat(
					item.chat.id,
				);
				return {
					memberId: item.memberId,
					chatId: item.chat.id,
					chatCreateAt: item.chat.createdAt,
					chatMembers: chatMembers,
				};
			}),
		);

		return result;
	}

	async createChat(dto: ChatCreateReqDto) {
		const chatId = await this.chatsRepository.createChat();

		await this.memberChatRepository.createMembersEnteredByChat(
			chatId.id,
			dto.memberIds,
		);
		return chatId;
	}

	async checkIfChatExists(chatId: string) {
		const exists = await this.chatsRepository.exist({
			where: {
				id: chatId,
			},
		});

		return exists;
	}
}
