import React, { FC } from 'react';
import styles from './SharedMembersHoverModal.module.scss';
import { SharedMembersHoverModalProps } from './shared-members-hover-modal.interface';
import SharedMemberItem from './shared-member-item/SharedMemberItem';

const SharedMembersHoverModal: FC<SharedMembersHoverModalProps> = ({
	sharedMembers,
}) => {
	return (
		<div className={styles.container}>
			{sharedMembers.map((item, index) => (
				<SharedMemberItem key={index} sharedMember={item} />
			))}
		</div>
	);
};

export default SharedMembersHoverModal;
