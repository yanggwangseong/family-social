import React, { FC, useEffect, useState } from 'react';
import styles from './ScheduleSidebar.module.scss';
import SchedulePeriodSelect from '@/components/ui/select/schedule/SchedulePeriodSelect';
import { PeriodsType, periodAtom } from '@/atoms/periodAtom';
import { useRecoilState } from 'recoil';
import ScheduleTourism from '@/components/ui/schedule/tourism/Tourism';
import { selectedPeriodAtom } from '@/atoms/selectedPeriodAtom';
import { useSortable } from '@/hooks/useSortable';

interface SocialNetwork {
	title: string;
	color: string;
	backgroundColor: string;
}

const SocialNetworks: SocialNetwork[] = [
	{ title: 'Twitter', color: 'white', backgroundColor: 'Red' },
	{ title: 'Facebook', color: 'black', backgroundColor: 'Orange' },
	{ title: 'Line', color: 'black', backgroundColor: 'Yellow' },
	{ title: 'Instagram', color: 'white', backgroundColor: 'Green' },
	{ title: 'Telegram', color: 'white', backgroundColor: 'Blue' },
	{ title: 'KaKao', color: 'white', backgroundColor: 'DarkBlue' },
	{ title: 'LinkedIn', color: 'white', backgroundColor: 'Purple' },
];

const ScheduleSidebar: FC = () => {
	const [isPeriods, setIsPeriods] = useRecoilState(periodAtom);

	const [isSelectedPeriod, setIsSelectedPeriod] =
		useRecoilState(selectedPeriodAtom);

	const {
		handleDragOver,
		handleDragStart,
		handleDragEnd,
		handleDragEnter,
		handleDragLeave,
		handleDrop,
		lists,
	} = useSortable<SocialNetwork>(SocialNetworks);

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
				<div className={styles.stay_time}>2시간 0분 / 12시간 0분</div>
			</div>

			<div>
				{isPeriods.map((period, index) => (
					<div className={styles.schedule_tourism_container} key={index}>
						{period.period === isSelectedPeriod ? (
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

				<ul className="List">
					{lists.map((sns, index) => (
						<li
							key={index}
							data-position={index}
							onDragOver={handleDragOver}
							onDragStart={handleDragStart}
							onDragEnd={handleDragEnd}
							onDrop={handleDrop}
							onDragEnter={handleDragEnter}
							onDragLeave={handleDragLeave}
							draggable
							style={{
								backgroundColor: sns.backgroundColor,
								color: sns.color,
								fontWeight: 'bold',
							}}
						>
							{sns.title}
						</li>
					))}
				</ul>
			</div>
		</div>
	) : null;
};

export default ScheduleSidebar;
