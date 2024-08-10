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
import { useNotificationInfinite } from '@/hooks/useNotificationInfinite';
import Skeleton from '@/components/ui/skeleton/Skeleton';
import { AnimatePresence } from 'framer-motion';

const NotificationContainer: FC = () => {
	const router = useRouter();
	const query = router.query as { options: Union<typeof isReadOptions> };

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isLoading,
		isError,
		isRefetching,
		refetch,
	} = useNotificationInfinite(
		['get-notifications', query.options ?? 'ALL'],
		async ({ pageParam = 1 }) =>
			await NotificationService.getNotifications(pageParam, query.options),
		query.options,
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
								{isLoading && <Skeleton />}
								{/* {data &&
									data.list.map((list, index) => (
										<NotificationItem
											key={index}
											index={index}
											notificationItem={list}
											isDescription={true}
										/>
									))} */}

								{data?.pages.map((page, pageIndex) => (
									<AnimatePresence key={pageIndex}>
										{page.list.map((list, index) => (
											<NotificationItem
												key={index}
												index={index}
												notificationItem={list}
												isDescription={true}
											/>
										))}
									</AnimatePresence>
								))}

								{isRefetching && (
									<React.Fragment>
										<Skeleton />
										<Skeleton />
										<Skeleton />
									</React.Fragment>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Format>
	);
};

export default NotificationContainer;
