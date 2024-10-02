import {
	ChatListResponse,
	CreateChatRequest,
	GetChatsResponse,
} from '@/shared/interfaces/chat.interface';
import { axiosAPI } from 'api/axios';
import { ChatType, Union } from 'types';

export const ChatService = {
	async getChatList() {
		const { data } = await axiosAPI.get<GetChatsResponse>(`/chats`);

		return data;
	},

	async postChat(
		memberIds: string[],
		chatType: Union<typeof ChatType>,
		groupId?: string,
	) {
		const { data } = await axiosAPI.post(`/chats`, {
			memberIds,
			chatType,
			groupId,
		} satisfies CreateChatRequest);

		return data;
	},

	async getChat(chatId: string) {
		const { data } = await axiosAPI.get<ChatListResponse>(`/chats/${chatId}`);

		return data;
	},
};
