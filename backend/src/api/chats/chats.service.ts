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
		return await this.memberChatRepository.getMemberBelongToChats(memberId);
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
