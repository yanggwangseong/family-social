import { NotificationResponse } from '@/shared/interfaces/notification.interface';
import { axiosAPI } from 'api/axios';

export const NotificationService = {
	async getNotifications() {
		const { data } = await axiosAPI.get<NotificationResponse>(`/notifications`);

		return data;
	},
};
