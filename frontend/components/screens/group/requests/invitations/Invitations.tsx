import React, { FC } from 'react';
import InvitationItem from '@/components/ui/group/invitation-item/InvitationItem';
import styles from './Invitations.module.scss';
import { FamInvitation } from '@/shared/interfaces/fam.interface';

const Invitations: FC<{ invitations: FamInvitation[] }> = ({ invitations }) => {
	return (
		<div className={styles.invitation_container}>
			{invitations.map((invitation, index) => (
				<InvitationItem key={index} invitation={invitation}></InvitationItem>
			))}
		</div>
	);
};

export default Invitations;
