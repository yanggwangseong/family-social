import React, { FC } from 'react';
import styles from './DDay.module.scss';
import { DDayProps } from './d-day.interface';
import cn from 'classnames';

const DDay: FC<DDayProps> = ({ day }) => {
	return (
		<div
			className={cn(styles.d_day, {
				[styles.ended]: day === '종료',
			})}
		>
			{day}
		</div>
	);
};

export default DDay;
