import Format from '@/components/ui/layout/Format';
import styles from './GroupEvent.module.scss';
import React, { FC } from 'react';
import Header from '@/components/ui/header/Header';
import GroupSidebar from '@/components/ui/layout/sidebar/group/GroupSidebar';
import { useGroupEventItemIntersectionObserver } from '@/hooks/useGroupEventItemIntersectionObserver';
import { GroupEventService } from '@/services/group-event/group-event.service';
import { TranslateDateFormat } from '@/utils/translate-date-format';
import Skeleton from '@/components/ui/skeleton/Skeleton';
import { AnimatePresence } from 'framer-motion';
import GroupEventItem from '@/components/ui/group/event-item/GroupEventItem';
import NotFoundSearch from '@/components/ui/not-found/search/NotFoundSearch';
import {
	NOT_FOUND_GROUP_EVENT,
	NOT_FOUND_TOUR_MESSAGE,
} from '@/constants/index';
import GroupFormat from '@/components/ui/layout/group/GroupFormat';

const GroupEvent: FC = () => {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isLoading,
		isError,
		isRefetching,
		refetch,
	} = useGroupEventItemIntersectionObserver(
		['get-group-events-by-belong-to-group'],
		async ({ pageParam = 1 }) =>
			await GroupEventService.getGroupEventsByBelongToGroup({
				eventStartDate: TranslateDateFormat(new Date(), 'yyyy-MM-dd'),
				page: pageParam,
				limit: 10,
				order: 'ASC',
			}),
	);

	return (
		<Format title={'group-events'}>
			<GroupFormat>
				<div className={styles.top_title_container}>
					<div className={styles.top_title}>그룹 이벤트</div>
				</div>
				<div className={styles.group_event_container}>
					{isLoading && <Skeleton />}

					{data?.pages.map((page, pageIndex) => (
						<AnimatePresence key={pageIndex}>
							{page.list.map((event, index) => (
								<GroupEventItem
									key={event.id}
									index={index}
									page={page.page}
									data={event}
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

					{data?.pages[0].list.length === 0 && (
						<NotFoundSearch message={NOT_FOUND_GROUP_EVENT} />
					)}
				</div>
			</GroupFormat>
		</Format>
	);
};

export default GroupEvent;
