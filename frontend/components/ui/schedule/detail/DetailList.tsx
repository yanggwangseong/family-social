import React, { FC } from 'react';
import styles from './DetailList.module.scss';
import { TourismPeriodResponse } from '@/shared/interfaces/schedule.interface';
import { TranslateDateFormat } from '@/utils/translate-date-format';
import ScheduleDetailTourismItem from './tourism-item/DetailTourismItem';
import { AnimatePresence, motion } from 'framer-motion';

const ScheduleDetailList: FC<{
	list: TourismPeriodResponse;
	index: number;
}> = ({ list, index }) => {
	return (
		<div>
			<div className={styles.list_title_container}>
				<div className={styles.list_title}>{`${index + 1}일차`}</div>

				<div className={styles.list_date}>
					{TranslateDateFormat(new Date(list.period), 'yyyy-MM-dd (eee)')}
				</div>
			</div>
			<motion.div
				initial="hidden"
				animate="visible"
				exit={{ opacity: 0, transition: { duration: 1 } }}
				variants={{
					visible: { transition: { staggerChildren: 0.1 } },
				}}
			>
				{list.tourisms.map((tour, index) => (
					<ScheduleDetailTourismItem
						key={index}
						index={index + 1}
						lastItemNumber={list.tourisms.length}
						tourism={tour}
					></ScheduleDetailTourismItem>
				))}
			</motion.div>
		</div>
	);
};

export default ScheduleDetailList;
