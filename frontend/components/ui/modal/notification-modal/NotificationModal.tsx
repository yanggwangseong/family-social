import React, { FC } from 'react';
import styles from './NotificationModal.module.scss';
import { useQuery } from 'react-query';
import { NotificationService } from '@/services/notification/notification.service';
import Skeleton from '../../skeleton/Skeleton';
import NotificationItem from './notification-item/NotificationItem';
import Link from 'next/link';
import {
	toggleVariant,
	toggleWrapperVariant,
} from '@/utils/animation/toggle-variant';
import { motion } from 'framer-motion';

const NotificationModal: FC<{ isOpenNotification: boolean }> = ({
	isOpenNotification,
}) => {
	const { data, isLoading } = useQuery(
		['get-notifications'],
		async () => await NotificationService.getNotifications('NOTREAD'),
	);

	return (
		<motion.div
			className={styles.container}
			variants={toggleWrapperVariant}
			style={{ pointerEvents: isOpenNotification ? 'auto' : 'none' }}
		>
			<motion.div className={styles.top_wrap} variants={toggleVariant}>
				<div className={styles.title}>알람</div>
				<div className={styles.top_right_container}>
					<Link className={styles.right_text} href={`/notifications`}>
						전체보기
					</Link>
				</div>
			</motion.div>
			{isLoading && <Skeleton />}

			{data && (
				<motion.div className={styles.item_container} variants={toggleVariant}>
					{data.list.length === 0 ? (
						<div className={styles.not_found_text}>알람이 없습니다.</div>
					) : (
						data.list.map((list, index) => (
							<NotificationItem
								key={index}
								index={index}
								notificationItem={list}
								isDescription={false}
							/>
						))
					)}
				</motion.div>
			)}
		</motion.div>
	);
};

export default NotificationModal;
