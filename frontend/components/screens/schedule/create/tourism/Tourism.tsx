import React, { FC } from 'react';
import styles from './Tourism.module.scss';
import { TourismProps } from './tourism.interface';

const Tourism: FC<TourismProps> = ({ isPeriods }) => {
	return (
		<div className={styles.tourism_container}>
			<div className={styles.step_title}>STEP 3</div>
			<div className={styles.title}>관광 선택</div>
			{isPeriods.map((period, index) => (
				<div key={index}>{period}</div>
			))}
		</div>
	);
};

export default Tourism;
