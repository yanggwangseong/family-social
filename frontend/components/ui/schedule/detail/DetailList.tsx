import React, { FC } from 'react';
import styles from './DetailList.module.scss';
import { TourismPeriodResponse } from '@/shared/interfaces/schedule.interface';
import { TranslateDateFormat } from '@/utils/translate-date-format';

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
		</div>
	);
};

export default ScheduleDetailList;
