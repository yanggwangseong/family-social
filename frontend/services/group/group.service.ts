import { GroupDetailResponse } from '@/shared/interfaces/fam.interface';
import {
	CreateGroupRequest,
	GroupResponse,
	MemberBelongToGroupsResponse,
	UpdateGroupRequest,
} from '@/shared/interfaces/group.interface';
import { MembersBelongToGroupResponse } from '@/shared/interfaces/member.interface';
import { GetScheduleListResponse } from '@/shared/interfaces/schedule.interface';
import { axiosAPI } from 'api/axios';
import { GroupInviteLinkPaginateLimit } from 'types';

export const GroupService = {
	async getGroupDetail(groupId: string) {
		const { data } = await axiosAPI.get<GroupDetailResponse>(
			`/groups/${groupId}`,
		);

		return data;
	},

	async getMemberBelongToGroups(
		forChatCreation?: boolean,
		isMainRole?: boolean,
	): Promise<MemberBelongToGroupsResponse[]> {
		let url = '/groups';
		if (forChatCreation) {
			url += '?forChatCreation=true';
		}

		if (isMainRole) {
			url += '?isMainRole=true';
		}

		const { data } = await axiosAPI.get<MemberBelongToGroupsResponse[]>(url);

		return data;
	},

	async getMembersBelongToGroup(groupId: string, excludeSelf?: boolean) {
		let url = `/groups/${groupId}/members`;
		if (excludeSelf) {
			url += '?excludeSelf=true';
		}
		const { data } = await axiosAPI.get<MembersBelongToGroupResponse[]>(url);
		return data;
	},

	async getScheduleListByGroupId(groupId: string, page: number, limit: number) {
		const { data } = await axiosAPI.get<GetScheduleListResponse>(
			`/groups/${groupId}/schedules?page=${page}&limit=${limit}`,
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
		} satisfies CreateGroupRequest);

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
		} satisfies UpdateGroupRequest);

		return data;
	},

	async deleteGroup(groupId: string) {
		const { data } = await axiosAPI.delete<void>(`/groups/${groupId}`);
	},

	async inviteCodeVerify(inviteCode: string, groupId: string) {
		const { data } = await axiosAPI.post(`/groups/${groupId}/invite`, {
			inviteCode,
		} satisfies { inviteCode: string });

		return data;
	},

	async getInviteLinkByGroupId(
		groupId: string,
		maxUses: GroupInviteLinkPaginateLimit,
	) {
		const { data } = await axiosAPI.get<string>(
			`/groups/${groupId}/invite-link?maxUses=${maxUses}`,
		);

		return data;
	},

	async followGroup(groupId: string, followingGroupId: string) {
		const { data } = await axiosAPI.put(`/groups/${groupId}/follow`, {
			followingGroupId,
		} satisfies { followingGroupId: string });

		return data;
	},
};
