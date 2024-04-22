import Header from '@/components/ui/header/Header';
import Format from '@/components/ui/layout/Format';
import { NotificationService } from '@/services/notification/notification.service';
import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { Union, isReadOptions } from 'types';
import styles from './Notification.module.scss';
import MainSidebar from '@/components/ui/layout/sidebar/main/MainSidebar';
import TabMenu from '@/components/ui/tab-menu/TabMenu';
import { notificationsTabMenus } from '@/components/ui/tab-menu/tab-menu.constants';
import { useRouter } from 'next/router';
import NotificationItem from '@/components/ui/modal/notification-modal/notification-item/NotificationItem';

const NotificationContainer: FC = () => {
	const router = useRouter();
	const query = router.query as { options: Union<typeof isReadOptions> };

	const { data, isLoading } = useQuery(
		['get-notifications', isReadOptions[0]],
		async () => await NotificationService.getNotifications('ALL'),
	);

	return (
		<Format title={'notification'}>
			<div className={styles.container}>
				{/* 헤더 */}
				<Header />
				<div className={styles.contents_container}>
					{/* 왼쪽 사이드바 */}
					<MainSidebar />
					<div className={styles.detail_container}>
						<div className={styles.main_contents_container}>
							{/* 탭메뉴 */}
							<div className={styles.tap_menu_container}>
								<TabMenu
									list={notificationsTabMenus}
									options={query.options ?? 'ALL'}
								/>
							</div>
							<div className={styles.notification_lst_container}>
								{data &&
									data.list.map((list, index) => (
										<NotificationItem
											key={index}
											index={index}
											notificationItem={list}
											isDescription={true}
										/>
									))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Format>
	);
};

export default NotificationContainer;
