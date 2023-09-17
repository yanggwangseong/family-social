import React, { FC } from 'react';
import InvitationItem from '@/components/ui/group/invitation-item/InvitationItem';
import styles from './Invitations.module.scss';
import { FamInvitationsResponse } from '@/shared/interfaces/fam.interface';

const Invitations: FC<{ invitations: FamInvitationsResponse }> = ({
	invitations,
}) => {
	return (
		<div className={styles.invitation_container}>
			<InvitationItem></InvitationItem>
		</div>
	);
};

export default Invitations;
