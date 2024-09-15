import React, { FC } from 'react';
import InvitationItem from '@/components/ui/group/invitation-item/InvitationItem';
import styles from './Invitations.module.scss';
import { FamInvitation } from '@/shared/interfaces/fam.interface';

import { useQueryClient } from 'react-query';

import { FamService } from '@/services/fam/fam.service';
import { InvitationFields } from './invitations.interface';
import { useCreateMutation } from '@/hooks/useCreateMutation';

const Invitations: FC<{ invitations: FamInvitation[] }> = ({ invitations }) => {
	const queryClient = useQueryClient();

	const { mutate: acceptInvitationSync } = useCreateMutation(
		async (data: InvitationFields) => FamService.AcceptInvitation(data),
		{
			successOption: {
				title: '성공',
				message: '그룹가입을 수락 하였습니다.',
				buttonText: '확인',
				callbackOrOptions: () => {
					queryClient.invalidateQueries(['group-requests']);
				},
			},
			mutationKey: ['accept-invitation'],
		},
	);

	const { mutate: rejectInvitationSync } = useCreateMutation(
		async (data: InvitationFields) => FamService.RejectInvitation(data),
		{
			successOption: {
				title: '성공',
				message: '그룹가입을 거절 하였습니다.',
				buttonText: '확인',
				callbackOrOptions: () => {
					queryClient.invalidateQueries(['group-requests']);
				},
			},
			mutationKey: ['reject-invitation'],
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
