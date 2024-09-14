import { UpdateProfileRequest } from '@/components/ui/modal/layer-modal/layer/EditProfile/edit-profile.interface';
import {
	MemberAccountResponse,
	MemberByMemberIdResponse,
	SearchMemberResponse,
	UpdateProfileRequestBodyData,
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
		} satisfies UpdateProfileRequestBodyData);

		return data;
	},

	async getAllMembers() {
		const { data } = await axiosAPI.get<SearchMemberResponse[]>(`/members`);
		return data;
	},

	async getMemberByMemberEmail(email: string) {
		const { data } = await axiosAPI.get<MemberAccountResponse>(
			`/members/email/${email}`,
		);
		return data;
	},

	async getMemberByMemberId(memberId: string) {
		const { data } = await axiosAPI.get<MemberByMemberIdResponse>(
			`/members/${memberId}`,
		);
		return data;
	},
};
