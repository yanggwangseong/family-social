import { UpdateProfileRequest } from '@/components/ui/modal/layer-modal/layer/EditProfile/edit-profile.interface';
import {
	MemberAccountResponse,
	MembersBelongToGroupResponse,
	MembersResponse,
	SearchMemberResponse,
} from '@/shared/interfaces/member.interface';
import { axiosAPI } from 'api/axios';

export const MemberService = {
	async updateProfile({
		memberId,
		username,
		phoneNumber,
		profileImage,
	}: UpdateProfileRequest) {
		const { data } = await axiosAPI.put<void>(`/members/${memberId}`, {
			username,
			phoneNumber,
			profileImage,
		});

		return data;
	},

	async getMembersBelongToGroup(groupId: string) {
		const { data } = await axiosAPI.get<MembersBelongToGroupResponse[]>(
			`groups/${groupId}/members/`,
		);
		return data;
	},

	async getMembersByUserName(username: string) {
		const { data } = await axiosAPI.get<SearchMemberResponse[]>(
			`/search/members/username/${username}`,
		);
		return data;
	},

	async getMemberByMemberEmail(email: string) {
		const { data } = await axiosAPI.get<MemberAccountResponse>(
			`/members/email/${email}`,
		);
		return data;
	},

	async getMemberByMemberId(memberId: string) {
		const { data } = await axiosAPI.get<MembersResponse>(
			`/members/${memberId}`,
		);
		return data;
	},
};
