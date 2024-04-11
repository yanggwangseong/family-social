import React, { FC } from 'react';
import styles from './NotificationItem.module.scss';
import Profile from '@/components/ui/profile/Profile';
import Image from 'next/image';

const NotificationItem: FC = () => {
	return (
		<div className={styles.notification_item_container}>
			<div>
				<Image
					className={styles.profile_img}
					width={40}
					height={40}
					src={'/images/profile/profile.png'}
					alt="img"
				></Image>
			</div>

			<div className={styles.description_container}>
				<div className={styles.notification_title}>
					Alexandre mentioned you in a
				</div>
				<div className={styles.notification_date}>2024-04-02</div>
			</div>
		</div>
	);
};

export default NotificationItem;
