import React, { FC } from 'react';
import styles from './Tourism.module.scss';

const Tourism: FC = () => {
	return (
		<div className={styles.tourism_container}>
			<div className={styles.step_title}>STEP 3</div>
			<div className={styles.title}>관광 선택</div>
		</div>
	);
};

export default Tourism;
