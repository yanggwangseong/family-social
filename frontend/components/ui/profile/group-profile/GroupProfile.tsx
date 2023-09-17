import React, { FC } from 'react';
import styles from './GroupProfile.module.scss';
import Image from 'next/image';
import { GroupResponse } from '@/shared/interfaces/group.interface';

const GroupProfile: FC<{ group: GroupResponse }> = ({ group }) => {
	return (
		<div className={styles.profile_container}>
			<div className={styles.profile_img_container}>
				<Image
					className=""
					width={40}
					height={40}
					src={'/images/profile/profile.png'}
					alt="img"
				></Image>
			</div>
			<div>
				<div className={styles.profile_username}>{group.groupName}</div>
				<div className={styles.profile_description}>
					{group.groupDescription}
				</div>
			</div>
		</div>
	);
};

export default GroupProfile;
