import React, { FC, useEffect } from 'react';
import styles from './ScheduleSidebar.module.scss';
import SchedulePeriodSelect from '@/components/ui/select/schedule/SchedulePeriodSelect';
import { PeriodsType, periodAtom } from '@/atoms/periodAtom';
import { ScheduleSidebarProps } from './schedule-sidebar.interface';
import { useRecoilState } from 'recoil';
import ScheduleTourism from '@/components/ui/schedule/tourism/Tourism';

const ScheduleSidebar: FC<ScheduleSidebarProps> = ({
	periodItem,
	onSelectedPeriod,
}) => {
	const [isPeriods, setIsPeriods] = useRecoilState(periodAtom);

	const handleSelectedPeriod = (period: PeriodsType) => {
		onSelectedPeriod(period);
	};

	return periodItem ? (
		<div className={styles.right_sidebar_container}>
			<div>
				<SchedulePeriodSelect
					selectedDate={periodItem.period}
					onSelectedPeriod={handleSelectedPeriod}
				></SchedulePeriodSelect>
			</div>
			<div className={styles.sidebar_tourism_total_time_container}>
				<div className={styles.tourism_count}>12</div>
				<div className={styles.stay_time}>2시간 0분 / 12시간 0분</div>
			</div>

			<div>
				{isPeriods.map((period, index) => (
					<div className={styles.schedule_tourism_container} key={index}>
						{period.period === periodItem.period ? (
							period.tourism && period.tourism.length > 0 ? (
								period.tourism.map((tour, index) => (
									<ScheduleTourism
										key={index}
										contentId={tour.contentId}
										stayTime={tour.stayTime}
										tourismImage={tour.tourismImage}
										title={tour.title}
										position={tour.position}
									/>
								))
							) : (
								<div className={styles.not_found_tourism_container}>
									<div className={styles.not_found_text}>
										장소를 선택해주세요.
									</div>
								</div>
							)
						) : null}
					</div>
				))}
			</div>
		</div>
	) : null;
};

export default ScheduleSidebar;
