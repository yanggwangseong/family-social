import {
	FamInvitationsResponse,
	FamResponse,
} from '@/shared/interfaces/fam.interface';
import { axiosAPI } from 'api/axios';

export const FamService = {
	async getInvitations(): Promise<FamInvitationsResponse> {
		const { data } = await axiosAPI.get<FamInvitationsResponse>(
			'/fams/invitations',
		);

		return data;
	},

	async AcceptInvitation({
		groupId,
		memberId,
		famId,
	}: {
		groupId: string;
		memberId: string;
		famId: string;
	}) {
		const { data } = await axiosAPI.put<FamResponse>(
			`/groups/${groupId}/members/${memberId}/fams/${famId}/accept-invitation`,
			{
				invitationAccepted: true,
			},
		);
		return data;
	},
};
