import React, { FC } from 'react';
import styles from './DetailList.module.scss';

const ScheduleDetailList: FC = () => {
	return (
		<div>
			<div className={styles.list_title_container}>
				<div className={styles.list_title}>1일차</div>
				<div className={styles.list_date}>2024-01-22(월)</div>
			</div>
		</div>
	);
};

export default ScheduleDetailList;
