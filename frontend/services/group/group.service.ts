import { GroupResponse } from '@/shared/interfaces/group.interface';
import { axiosAPI } from 'api/axios';

export const GroupService = {
	async createGroup(
		groupName: string,
		groupDescription: string,
	): Promise<GroupResponse> {
		const { data } = await axiosAPI.post<GroupResponse>('/groups', {
			groupName,
			groupDescription,
		});

		return data;
	},
};
