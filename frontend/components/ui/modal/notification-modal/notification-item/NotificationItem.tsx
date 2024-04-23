import React, { FC } from 'react';
import styles from './NotificationItem.module.scss';
import Image from 'next/image';
import { NotificationItemProps } from './notification-item.interface';
import { motion } from 'framer-motion';
import { easeOutAnimation } from '@/utils/animation/ease-out';
import { useRouter } from 'next/router';

const NotificationItem: FC<NotificationItemProps> = ({
	notificationItem,
	isDescription = false,
	index,
}) => {
	const router = useRouter();

	const handleFeedDetailPage = (feedId: string) => {
		router.push(`/feeds/${feedId}`);
	};

	return (
		<motion.div
			className={styles.notification_item_container}
			{...easeOutAnimation(index)}
			onClick={() => {
				notificationItem.notificationFeedId &&
					handleFeedDetailPage(notificationItem.notificationFeedId);
			}}
		>
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
		</motion.div>
	);
};

export default NotificationItem;
