import { FamInvitationsResponse } from '@/shared/interfaces/fam.interface';
import { axiosAPI } from 'api/axios';

export const FamService = {
	async getInvitations(): Promise<FamInvitationsResponse> {
		const { data } = await axiosAPI.get<FamInvitationsResponse>(
			'/fams/invitations',
		);

		return data;
	},
};
