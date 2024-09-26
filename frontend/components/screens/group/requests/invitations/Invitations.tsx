import React, { FC } from 'react';
import InvitationItem from '@/components/ui/group/invitation-item/InvitationItem';
import styles from './Invitations.module.scss';
import { FamInvitation } from '@/shared/interfaces/fam.interface';

import { useQueryClient } from 'react-query';

import { FamService } from '@/services/fam/fam.service';
import { InvitationFields } from './invitations.interface';
import { useCreateMutation } from '@/hooks/useCreateMutation';
import { Loading, Report } from 'notiflix';

const Invitations: FC<{ invitations: FamInvitation[] }> = ({ invitations }) => {
	const queryClient = useQueryClient();

	const { mutate: acceptInvitationSync } = useCreateMutation(
		async (data: InvitationFields) => FamService.AcceptInvitation(data),
		{
			mutationKey: ['accept-invitation'],
			onSuccess: data => {
				Loading.remove();
				Report.success('성공', '그룹가입을 수락 하였습니다.', '확인', () => {
					queryClient.invalidateQueries(['group-requests']);
				});
			},
		},
	);

	const { mutate: rejectInvitationSync } = useCreateMutation(
		async (data: InvitationFields) => FamService.RejectInvitation(data),
		{
			mutationKey: ['reject-invitation'],
			onSuccess: data => {
				Loading.remove();
				Report.success('성공', '그룹가입을 거절 하였습니다.', '확인', () => {
					queryClient.invalidateQueries(['group-requests']);
				});
			},
		},
	);

	const handleAcceptInvitation = (data: InvitationFields) => {
		acceptInvitationSync(data);
	};

	const handleRejectInvitation = (data: InvitationFields) => {
		rejectInvitationSync(data);
	};

	return (
		<div className={styles.invitation_container}>
			{invitations.map((invitation, index) => (
				<InvitationItem
					key={index}
					invitation={invitation}
					onAcceptInvitation={handleAcceptInvitation}
					onRejectInvitation={handleRejectInvitation}
				></InvitationItem>
			))}
		</div>
	);
};

export default Invitations;
