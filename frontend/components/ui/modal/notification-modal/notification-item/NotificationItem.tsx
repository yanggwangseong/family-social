import React, { FC } from 'react';
import styles from './NotificationItem.module.scss';
import Image from 'next/image';
import { NotificationItemProps } from './notification-item.interface';

const NotificationItem: FC<NotificationItemProps> = ({
	notificationItem,
	isDescription = false,
}) => {
	return (
		<div className={styles.notification_item_container}>
			<div>
				<Image
					className={styles.profile_img}
					width={40}
					height={40}
					src={
						notificationItem.sender.profileImage ??
						'/images/profile/profile.png'
					}
					alt="img"
				></Image>
			</div>

			<div className={styles.description_container}>
				<div className={styles.notification_title}>
					{notificationItem.notificationTitle}
				</div>
				{isDescription && (
					<div className={styles.notification_description}>
						{notificationItem.notificationDescription}
					</div>
				)}
				<div className={styles.notification_date}>
					{notificationItem.createdAt}
				</div>
			</div>
		</div>
	);
};

export default NotificationItem;
