import { NotificationItem } from '@/shared/interfaces/notification.interface';
import { BasicPaginationResponse } from '@/shared/interfaces/pagination.interface';
import { axiosAPI } from 'api/axios';
import { Union, isReadOptions } from 'types';

export const NotificationService = {
	async getNotifications(
		page: number,
		readOptions: Union<typeof isReadOptions> = 'ALL',
	) {
		const { data } = await axiosAPI.get<
			BasicPaginationResponse<NotificationItem>
		>(
			`/notifications?page=${page}&is_read_options=${readOptions}&limit=10&order__createdAt=DESC`,
		);

		return data;
	},
};
