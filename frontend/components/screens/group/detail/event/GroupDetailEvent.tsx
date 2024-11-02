import Format from '@/components/ui/layout/Format';
import GroupDetailFormat from '@/components/ui/layout/group/group-detail/GroupDetailFormat';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import styles from './GroupDetailEvent.module.scss';
import GroupEventItem from '@/components/ui/group/event-item/GroupEventItem';
import { GroupEventService } from '@/services/group-event/group-event.service';
import { useGroupEventItemIntersectionObserver } from '@/hooks/useGroupEventItemIntersectionObserver';
import { TranslateDateFormat } from '@/utils/translate-date-format';
import Skeleton from '@/components/ui/skeleton/Skeleton';
import { AnimatePresence } from 'framer-motion';
import { withGroupDetailProps } from 'hoc/with-group-detail-props';
import { GroupDetailProps } from '../group-detail.interface';

const GroupDetailEvent: FC<GroupDetailProps> = ({ groupAccessLevel }) => {
	const router = useRouter();
	const { groupId } = router.query as { groupId: string };

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isLoading,
		isError,
		isRefetching,
		refetch,
	} = useGroupEventItemIntersectionObserver(
		['get-list-group-event', groupId],
		async ({ pageParam = 1 }) =>
			await GroupEventService.getListGroupEvent(
				{
					eventStartDate: TranslateDateFormat(new Date(), 'yyyy-MM-dd'),
					page: pageParam,
					limit: 3,
					order: 'ASC',
				},
				groupId,
			),
		{
			enabled: !!groupId,
		},
	);

	return (
		<Format title={'group-detail-event'}>
			<GroupDetailFormat
				groupId={groupId}
				groupAccessLevel={groupAccessLevel}
				page="GROUPEVENT"
			>
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
				</div>
			</GroupDetailFormat>
		</Format>
	);
};

export default withGroupDetailProps(GroupDetailEvent);
