import React, { FC } from 'react';
import styles from './ScheduleContainer.module.scss';
import { useScheduleIntersectionObserver } from '@/hooks/useScheduleIntersectionObserver';
import Skeleton from '@/components/ui/skeleton/Skeleton';
import { AnimatePresence } from 'framer-motion';
import ScheduleItem from '@/components/ui/schedule/ScheduleItem';
import { ScheduleContainerProps } from './schedule-container.interface';

const ScheduleContainer: FC<ScheduleContainerProps> = ({
	options = 'SCHEDULEALL',
}) => {
	const { data, isLoading, isRefetching } =
		useScheduleIntersectionObserver(options);

	return (
		<div className={styles.schedule_container}>
			{isLoading && <Skeleton />}

			{data?.pages.map((page, pageIndex) => (
				<AnimatePresence key={pageIndex}>
					{page.list.map((schedule, index) => (
						<ScheduleItem key={schedule.id} index={index} schedule={schedule} />
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
	);
};

export default ScheduleContainer;
