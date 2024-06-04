import { NotificationResponse } from '@/shared/interfaces/notification.interface';
import { axiosAPI } from 'api/axios';
import { Union, isReadOptions } from 'types';

export const NotificationService = {
	async getNotifications(readOptions: Union<typeof isReadOptions>) {
		const { data } = await axiosAPI.get<NotificationResponse>(
			`/notifications?is_read_options=${readOptions}&limit=10`,
		);

		return data;
	},
};
