import React, { FC } from 'react';
import styles from './NotificationModal.module.scss';
import { useQuery } from 'react-query';
import { NotificationService } from '@/services/notification/notification.service';
import Skeleton from '../../skeleton/Skeleton';

const NotificationModal: FC = () => {
	const { data, isLoading } = useQuery(
		['get-notifications'],
		async () => await NotificationService.getNotifications(),
	);

	return (
		<div className={styles.container}>
			<div className={styles.top_wrap}>
				<div className={styles.title}>알람</div>
				<div className={styles.top_right_container}>
					<div className={styles.right_text}>전체보기</div>
				</div>
			</div>
			{isLoading && <Skeleton />}

			{data && (
				<div className={styles.item_container}>
					{data.list.length === 0 ? (
						<div className={styles.not_found_text}>알람이 없습니다.</div>
					) : (
						<div>items</div>
					)}
				</div>
			)}
		</div>
	);
};

export default NotificationModal;
