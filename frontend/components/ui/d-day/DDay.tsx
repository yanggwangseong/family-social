import React, { FC } from 'react';
import styles from './DDay.module.scss';
import { DDayProps } from './d-day.interface';

const DDay: FC<DDayProps> = ({ day }) => {
	return <div className={styles.d_day}>{`D-${day}`}</div>;
};

export default DDay;
