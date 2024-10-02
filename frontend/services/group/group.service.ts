import { GroupDetailResponse } from '@/shared/interfaces/fam.interface';
import { FeedsResponse } from '@/shared/interfaces/feed.interface';
import {
	CreateGroupRequest,
	GroupResponse,
	MemberBelongToGroupsResponse,
	UpdateGroupRequest,
} from '@/shared/interfaces/group.interface';
import { MembersBelongToGroupResponse } from '@/shared/interfaces/member.interface';
import { GetScheduleListResponse } from '@/shared/interfaces/schedule.interface';
import { axiosAPI } from 'api/axios';

export const GroupService = {
	async getGroupDetail(groupId: string) {
		const { data } = await axiosAPI.get<GroupDetailResponse>(
			`/groups/${groupId}`,
		);

		return data;
	},

	async getMemberBelongToGroups(): Promise<MemberBelongToGroupsResponse[]> {
		// 그룹 채팅방 만들때 그룹 채팅방 생성 권한인 main인지 확인하고 main일때만 생성 가능
		// 그리고 이미 만든 그룹 채팅방은 제외해야 할까?
		const { data } = await axiosAPI.get<MemberBelongToGroupsResponse[]>(
			'/groups',
		);

		return data;
	},

	async getMembersBelongToGroup(groupId: string) {
		const { data } = await axiosAPI.get<MembersBelongToGroupResponse[]>(
			`groups/${groupId}/members`,
		);
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
};
