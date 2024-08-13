import React, { FC, Fragment } from 'react';
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
import { useNotificationInfinite } from '@/hooks/useNotificationInfinite';

const NotificationModal: FC<{ isOpenNotification: boolean }> = ({
	isOpenNotification,
}) => {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isLoading,
		isError,
		isRefetching,
		refetch,
	} = useNotificationInfinite(
		['get-notifications', 'NOTREAD'],
		async ({ pageParam = 1 }) =>
			await NotificationService.getNotifications(pageParam, 'NOTREAD'),
		'NOTREAD',
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
					{data.pages[0].list.length === 0 ? (
						<div className={styles.not_found_text}>알람이 없습니다.</div>
					) : (
						data?.pages.map((page, pageIndex) => (
							<Fragment key={pageIndex}>
								{page.list.map((list, index) => (
									<NotificationItem
										key={index}
										index={index}
										notificationItem={list}
										isDescription={true}
									/>
								))}
							</Fragment>
						))
					)}
				</motion.div>
			)}
		</motion.div>
	);
};

export default NotificationModal;
