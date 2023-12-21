import React, { FC } from 'react';
import styles from './ScheduleSidebar.module.scss';
import SchedulePeriodSelect from '@/components/ui/select/schedule/SchedulePeriodSelect';
import { PeriodsType } from '@/atoms/periodAtom';
import { ScheduleSidebarProps } from './schedule-sidebar.interface';

const ScheduleSidebar: FC<ScheduleSidebarProps> = ({
	periodItem,
	isPeriods,
	onSelectedPeriod,
}) => {
	const handleSelectedPeriod = (period: PeriodsType) => {
		onSelectedPeriod(period);
	};

	const currentDay = isPeriods.findIndex(
		item => item.period === periodItem.period,
	);

	return periodItem ? (
		<div className={styles.right_sidebar_container}>
			<div>
				<SchedulePeriodSelect
					selectedDate={periodItem.period}
					onSelectedPeriod={handleSelectedPeriod}
					currentDay={currentDay + 1}
				></SchedulePeriodSelect>
			</div>
			<div className={styles.sidebar_tourism_total_time_container}>
				<div className={styles.tourism_count}>12</div>
				<div className={styles.stay_time}>2시간 0분 / 12시간 0분</div>
			</div>
			<div className={styles.not_found_tourism_container}>
				<div className={styles.not_found_text}>장소를 선택해주세요.</div>
			</div>
		</div>
	) : null;
};

export default ScheduleSidebar;
