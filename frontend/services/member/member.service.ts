import { UpdateProfileRequest } from '@/components/ui/modal/layer-modal/layer/EditProfile/edit-profile.interface';
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
};
