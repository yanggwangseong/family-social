import React, { FC } from 'react';
import styles from './Tourism.module.scss';
import { TourismProps } from './tourism.interface';
import { useQuery } from 'react-query';
import { TourService } from '@/services/tour/tour.service';

const Tourism: FC<TourismProps> = ({ isPeriods }) => {
	const { data, isLoading } = useQuery(
		['tour-area-code'],
		async () => await TourService.getTourAreaCodes(),
	);

	if (isLoading) return <div>loading</div>;
	if (!data) return <div>loading</div>;

	return (
		<div className={styles.tourism_container}>
			<div className={styles.step_title}>STEP 3</div>
			<div className={styles.title}>관광 선택</div>
			{isPeriods.map((period, index) => (
				<div key={index}>{period}</div>
			))}
			{data.items.item.map(item => (
				<div>
					<div>{item.name}</div>
				</div>
			))}
		</div>
	);
};

export default Tourism;
