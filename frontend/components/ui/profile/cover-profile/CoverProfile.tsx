import React, { FC } from 'react';
import styles from './CoverProfile.module.scss';
import Image from 'next/image';

const CoverProfile: FC = () => {
	return (
		<div className={styles.profile_img_container}>
			<Image
				className="rounded-full"
				width={120}
				height={120}
				src={'/images/profile/profile.png'}
				alt="img"
			></Image>
		</div>
	);
};

export default CoverProfile;
