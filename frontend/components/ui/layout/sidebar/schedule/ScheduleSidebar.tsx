import React, { FC, useEffect, useState } from 'react';
import styles from './ScheduleSidebar.module.scss';
import SchedulePeriodSelect from '@/components/ui/select/schedule/SchedulePeriodSelect';
import { PeriodsType, periodAtom } from '@/atoms/periodAtom';
import { useRecoilState } from 'recoil';
import ScheduleTourism from '@/components/ui/schedule/tourism/Tourism';
import { selectedPeriodAtom } from '@/atoms/selectedPeriodAtom';
import { getSumTime } from '@/utils/get-sum-time';

const ScheduleSidebar: FC = () => {
	const [isPeriods, setIsPeriods] = useRecoilState(periodAtom);

	const [isSelectedPeriod, setIsSelectedPeriod] =
		useRecoilState(selectedPeriodAtom);

	return isSelectedPeriod ? (
		<div className={styles.right_sidebar_container}>
			<div>
				<SchedulePeriodSelect></SchedulePeriodSelect>
			</div>
			<div className={styles.sidebar_tourism_total_time_container}>
				<div className={styles.tourism_count}>
					{isPeriods.map(item => {
						if (item.period === isSelectedPeriod) {
							return item.tourism?.length;
						}
					})}
				</div>
				<div className={styles.stay_time}>
					{isPeriods.map(period => {
						if (period.period === isSelectedPeriod) {
							if (!period.tourism) {
								return `0시간 0분`;
							}
							const total = period.tourism.reduce(
								(prev, item) => {
									const hours =
										Number(prev.hours) + Number(item.stayTime.split(':')[0]);
									const minutes =
										Number(prev.minutes) + Number(item.stayTime.split(':')[1]);

									return {
										hours: hours + Math.floor(minutes / 60),
										minutes: minutes % 60,
									};
								},
								{ hours: 0, minutes: 0 },
							);

							const formattedTotal = `${String(total?.hours)}시간 ${String(
								total?.minutes,
							)}분`;
							return formattedTotal;
						}
					})}
					/
					{isPeriods.map(
						period =>
							period.period === isSelectedPeriod &&
							getSumTime(period.startTime, period.endTime),
					)}
				</div>
			</div>

			<div>
				{isPeriods.map((period, index) => (
					<div className={styles.schedule_tourism_container} key={index}>
						{period.period === isSelectedPeriod ? (
							period.tourism && period.tourism.length > 0 ? (
								<ScheduleTourism tourList={period.tourism}></ScheduleTourism>
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
