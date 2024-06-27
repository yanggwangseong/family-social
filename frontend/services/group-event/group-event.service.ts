import { CreateGroupEventRequest } from '@/shared/interfaces/group-event.interface';
import { axiosAPI } from 'api/axios';

export const GroupEventService = {
	async createGroupEvent(
		createGroupEventRequest: CreateGroupEventRequest,
		groupId: string,
	) {
		const { data } = await axiosAPI.post(`/groups/${groupId}/group-events`, {
			...createGroupEventRequest,
		} satisfies CreateGroupEventRequest);

		return data;
	},
};
