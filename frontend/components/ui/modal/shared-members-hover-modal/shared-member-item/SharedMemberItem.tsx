import React, { FC } from 'react';
import Image from 'next/image';
import styles from './SharedMemberItem.module.scss';
import { SharedMemberItemProps } from '../shared-members-hover-modal.interface';

const SharedMemberItem: FC<SharedMemberItemProps> = ({ sharedMember }) => {
	return (
		<div className={styles.profile_container}>
			<div>
				<div className={styles.profile_img_container}>
					<Image
						className="rounded-full"
						fill
						src={
							sharedMember.member.profileImage ?? '/images/profile/profile.png'
						}
						alt="img"
					></Image>
				</div>
			</div>
			<div className={styles.right_container}>
				<div className={styles.profile_username}>
					{sharedMember.member.username}
				</div>
				<div className={styles.profile_role}>{sharedMember.role}</div>
			</div>
		</div>
	);
};

export default SharedMemberItem;
