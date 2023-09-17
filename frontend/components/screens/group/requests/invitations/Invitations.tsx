import React, { FC } from 'react';
import InvitationItem from '@/components/ui/group/invitation-item/InvitationItem';
import styles from './Invitations.module.scss';
import { FamInvitation } from '@/shared/interfaces/fam.interface';

const Invitations: FC<{ invitations: FamInvitation[] }> = ({ invitations }) => {
	//초대 수락 usemutation [put] /groups/:groupId/members/:memberId/fams/:famId/accept-invitation
	//초대 거절 usemutation [delete] /groups/:groupId/members/:memberId/fams/:famId
	return (
		<div className={styles.invitation_container}>
			{invitations.map((invitation, index) => (
				<InvitationItem key={index} invitation={invitation}></InvitationItem>
			))}
		</div>
	);
};

export default Invitations;
