import {
	FamAcceptInvitationArgs,
	FamAcceptInvitationRequest,
	FamInvitationsResponse,
	FamRejectInvitationArgs,
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
	}: FamAcceptInvitationArgs) {
		const { data } = await axiosAPI.put<FamResponse>(
			`/groups/${groupId}/members/${memberId}/fams/${famId}/accept-invitation`,
			{
				invitationAccepted: true,
			} satisfies FamAcceptInvitationRequest,
		);
		return data;
	},

	async RejectInvitation({
		groupId,
		memberId,
		famId,
	}: FamRejectInvitationArgs) {
		const { data } = await axiosAPI.delete<FamResponse>(
			`/groups/${groupId}/members/${memberId}/fams/${famId}`,
		);
		return data;
	},

	async validateInvitationCode(inviteCode: string, groupId: string) {
		const { data } = await axiosAPI.post<void>(`/groups/${groupId}/invite`, {
			inviteCode,
		} satisfies { inviteCode: string });
	},
};
