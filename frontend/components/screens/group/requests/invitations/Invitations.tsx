import React, { FC } from 'react';
import InvitationItem from '@/components/ui/group/invitation-item/InvitationItem';
import styles from './Invitations.module.scss';

const Invitations: FC = () => {
	return (
		<div className={styles.invitation_container}>
			<InvitationItem></InvitationItem>
		</div>
	);
};

export default Invitations;
