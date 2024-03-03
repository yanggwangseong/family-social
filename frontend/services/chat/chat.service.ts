import { ChatListResponse } from '@/shared/interfaces/chat.interface';
import { axiosAPI } from 'api/axios';

export const ChatService = {
	async getChatList() {
		const { data } = await axiosAPI.get<ChatListResponse[]>(`/api/chats`);

		return data;
	},
};
