import { GetMessagesResponse } from '@/shared/interfaces/message.interface';
import { axiosAPI } from 'api/axios';

export const MessageService = {
	async getMessages(chatId: string) {
		const { data } = await axiosAPI.get<GetMessagesResponse>(
			`/chats/${chatId}/messages`,
		);

		return data;
	},
};
