import React, { FC } from 'react';
import styles from './DetailTourismItem.module.scss';
import Image from 'next/image';
import { BsFillStopwatchFill } from 'react-icons/bs';
import HeartAndStar from '@/components/ui/heart-and-star/HeartAndStar';

const ScheduleDetailTourismItem: FC<{ index: number }> = ({ index }) => {
	return <div className={styles.container}></div>;
};

export default ScheduleDetailTourismItem;
