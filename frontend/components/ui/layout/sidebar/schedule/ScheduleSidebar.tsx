import React, { FC } from 'react';
import styles from './ScheduleSidebar.module.scss';
import SchedulePeriodSelect from '@/components/ui/select/schedule/SchedulePeriodSelect';

const ScheduleSidebar: FC = () => {
	return (
		<div className={styles.right_sidebar_container}>
			<div>
				<SchedulePeriodSelect></SchedulePeriodSelect>
			</div>
			<div>2시간 0분 / 12시간 0분</div>
		</div>
	);
};

export default ScheduleSidebar;
