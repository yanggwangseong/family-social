import { FeedsResponse } from '@/shared/interfaces/feed.interface';
import {
	GroupResponse,
	MemberBelongToGroupsResponse,
} from '@/shared/interfaces/group.interface';
import { axiosAPI } from 'api/axios';

export const GroupService = {
	async getMemberBelongToGroups(): Promise<MemberBelongToGroupsResponse[]> {
		const { data } = await axiosAPI.get<MemberBelongToGroupsResponse[]>(
			'/groups',
		);

		return data;
	},

	async getFeedsOfGroup(
		page: number,
		options: 'GROUPFEED' | 'GROUPMEMBER' | 'GROUPEVENT' = 'GROUPFEED',
		groupId: string,
	) {
		const { data } = await axiosAPI.get<FeedsResponse>(
			`/groups/${groupId}/feeds?page=${page}&options=${options}`,
		);

		return data;
	},

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

	async updateGroup(
		groupId: string,
		groupName: string,
		groupDescription: string,
	): Promise<GroupResponse> {
		const { data } = await axiosAPI.put<GroupResponse>(`/groups/${groupId}`, {
			groupName,
			groupDescription,
		});

		return data;
	},

	async deleteGroup(groupId: string) {
		const { data } = await axiosAPI.delete<void>(`/groups/${groupId}`);
	},
};
