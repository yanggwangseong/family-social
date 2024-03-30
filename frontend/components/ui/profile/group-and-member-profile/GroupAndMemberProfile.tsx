import React, { FC } from 'react';
import styles from './GroupAndMemberProfile.module.scss';
import Image from 'next/image';

const GroupAndMemberProfile: FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.group_profile_container}>
				<Image
					fill
					src={'/images/banner/sm/group-base-sm.png'}
					alt="img"
				></Image>
				<div className={styles.profile_container}>
					<Image
						className="rounded-full"
						fill
						src={'/images/profile/profile.png'}
						alt="img"
					></Image>
				</div>
			</div>
		</div>
	);
};

export default GroupAndMemberProfile;
