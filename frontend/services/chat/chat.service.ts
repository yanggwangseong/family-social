import { axiosAPI } from 'api/axios';

export const ChatService = {
	async getChatList() {
		const { data } = await axiosAPI.get(`/api/chats`);

		return data;
	},
};
