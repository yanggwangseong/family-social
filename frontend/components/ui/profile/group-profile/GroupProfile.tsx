import React, { FC } from 'react';
import styles from './GroupProfile.module.scss';
import Image from 'next/image';
import { GroupProfileProps } from './group-profile.interface';

const GroupProfile: FC<GroupProfileProps> = ({ group }) => {
	return (
		<div className={styles.profile_container}>
			<div>
				<div className={styles.profile_img_container}>
					<Image
						width={40}
						height={40}
						src={'/images/banner/sm/group-base-sm.png'}
						alt="img"
					></Image>
				</div>
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
