import {
	CreateChatRequest,
	GetChatsResponse,
} from '@/shared/interfaces/chat.interface';
import { axiosAPI } from 'api/axios';

export const ChatService = {
	async getChatList() {
		const { data } = await axiosAPI.get<GetChatsResponse>(`/chats`);

		return data;
	},

	async postChat(memberIds: string[]) {
		const { data } = await axiosAPI.post(`/chats`, {
			memberIds,
		} satisfies CreateChatRequest);

		return data;
	},
};
