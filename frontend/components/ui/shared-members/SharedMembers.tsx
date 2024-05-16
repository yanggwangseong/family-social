import React, { FC } from 'react';
import Image from 'next/image';
import styles from './SharedMembers.module.scss';

const SharedMembers: FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.img_conatiner}>
				<Image
					className={styles.profile_img}
					fill
					src={'/images/banner/group-base.png'}
					alt=""
				></Image>
			</div>
			<div className={styles.shared_text}>5명에게 공유됨</div>
		</div>
	);
};

export default SharedMembers;
