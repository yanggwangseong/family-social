import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

import { ChatCreateReqDto } from '@/models/dto/chat/req/chat-create-req.dto';
import { GetChatListResDto } from '@/models/dto/chat/res/get-chat-list-res.dto';
import { MemberBelongToChatsResDto } from '@/models/dto/member-chat/res/member-belong-to-chats-res.dto';
import { GetMessagesListResDto } from '@/models/dto/message/res/get-messages-list-res.dto';
import { ChatsRepository } from '@/models/repositories/chats.repository';
import { MemberChatRepository } from '@/models/repositories/member-chat.repository';
import { MessagesRepository } from '@/models/repositories/messages.repository';

@Injectable()
export class ChatsService {
	constructor(
		private readonly messagesRepository: MessagesRepository,
		private readonly chatsRepository: ChatsRepository,
		private readonly memberChatRepository: MemberChatRepository,
	) {}

	async getMessagesByChat(
		chatId: string,
		memberId: string,
	): Promise<GetMessagesListResDto> {
		const messages = await this.messagesRepository.getMessagesByChat(
			chatId,
			memberId,
		);

		return {
			list: messages,
		};
	}

	async getMemberBelongToChats(memberId: string): Promise<GetChatListResDto> {
		const chat = await this.memberChatRepository.getMemberBelongToChats(
			memberId,
		);

		const result = await Promise.all(
			chat.map(async (item): Promise<MemberBelongToChatsResDto> => {
				const [[chatMembers, joinMemberCount], recentMessage] =
					await Promise.all([
						this.memberChatRepository.getMembersAndCountByChat(item.chatId),
						this.messagesRepository.getRecentMessageByChat(item.chatId),
					]);

				return {
					targetMemberId: item.targetMemberId,
					chatId: item.chatId,
					chatCreateAt: item.chatCreateAt,
					chatMembers,
					joinMemberCount,
					recentMessage,
				};
			}),
		);

		return {
			list: result,
		};
	}

	async createChat(dto: ChatCreateReqDto, qr?: QueryRunner) {
		const chatId = await this.chatsRepository.createChat(qr);

		await this.memberChatRepository.createMembersEnteredByChat(
			chatId.id,
			dto.memberIds,
			qr,
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
