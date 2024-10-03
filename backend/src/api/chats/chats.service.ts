import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

import { ChatCreateReqDto } from '@/models/dto/chat/req/chat-create-req.dto';
import { GetChatListResDto } from '@/models/dto/chat/res/get-chat-list-res.dto';
import { MemberBelongToChatsResDto } from '@/models/dto/member-chat/res/member-belong-to-chats-res.dto';
import { GetMessagesListResDto } from '@/models/dto/message/res/get-messages-list-res.dto';
import { ChatsRepository } from '@/models/repositories/chats.repository';
import { MemberChatRepository } from '@/models/repositories/member-chat.repository';
import { MessagesRepository } from '@/models/repositories/messages.repository';
import { ChatType, Union } from '@/types';

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

	async getChatById(chatId: string): Promise<MemberBelongToChatsResDto> {
		const chat = await this.chatsRepository.getChatById(chatId);
		return this.enrichChatWithDetails(chat);
	}

	async getMemberBelongToChats(memberId: string): Promise<GetChatListResDto> {
		const chats = await this.chatsRepository.getMemberBelongToChats(memberId);
		const enrichedChats = await Promise.all(
			chats.map((chat) => this.enrichChatWithDetails(chat)),
		);
		return { list: enrichedChats };
	}

	private async enrichChatWithDetails(
		chat: MemberBelongToChatsResDto,
	): Promise<MemberBelongToChatsResDto> {
		const [[chatMembers, joinMemberCount], recentMessage] = await Promise.all([
			this.memberChatRepository.getMembersAndCountByChat(chat.chatId),
			this.messagesRepository.getRecentMessageByChat(chat.chatId),
		]);

		return {
			...chat,
			chatMembers,
			joinMemberCount,
			recentMessage,
		};
	}

	async createChat(dto: ChatCreateReqDto, qr?: QueryRunner) {
		const chatId = await this.chatsRepository.createChat(
			dto.chatType,
			dto.groupId,
			qr,
		);

		await this.memberChatRepository.createMembersEnteredByChat(
			chatId,
			dto.memberIds,
			qr,
		);

		return chatId;
	}

	/**
	 * @summary 채팅방 존재 여부 확인
	 * @param chatId 채팅방 id
	 * @returns 채팅방 존재 여부
	 */
	async checkIfChatExists(chatId: string) {
		const exists = await this.chatsRepository.exist({
			where: {
				id: chatId,
			},
		});

		return exists;
	}

	/**
	 * @summary 채팅방 중복 생성 확인
	 * @param chatType 채팅방 타입
	 * @param memberIds 채팅방 멤버 id 배열
	 * @param groupId 그룹 id
	 * @returns 채팅방 존재 여부
	 */
	async getExistingChat(
		chatType: Union<typeof ChatType>,
		memberIds: string[],
		groupId?: string,
	) {
		if (groupId)
			return await this.chatsRepository.findExistingGroupChat(
				groupId,
				chatType,
			);

		return await this.chatsRepository.findExistingChat(memberIds, chatType);
	}
}
