import React, { FC } from 'react';
import styles from './GroupProfile.module.scss';
import Image from 'next/image';

const GroupProfile: FC = () => {
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
				<div className={styles.profile_username}>그룹이름입니다</div>
				<div className={styles.profile_description}>그룹설명입니다</div>
			</div>
		</div>
	);
};

export default GroupProfile;
