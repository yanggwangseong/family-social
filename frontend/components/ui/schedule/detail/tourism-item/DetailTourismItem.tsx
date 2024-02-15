import React, { FC } from 'react';
import styles from './DetailTourismItem.module.scss';
import Image from 'next/image';
import { BsFillStopwatchFill } from 'react-icons/bs';
import HeartAndStar from '@/components/ui/heart-and-star/HeartAndStar';
import { TourismResponse } from '@/shared/interfaces/schedule.interface';
import { ContentTypeName } from '@/constants/content-type.constant';

const ScheduleDetailTourismItem: FC<{
	index: number;
	lastItemNumber: number;
	tourism: TourismResponse;
}> = ({ index, lastItemNumber, tourism }) => {
	return (
		<div className={styles.container}>
			<div className={styles.top_container}>
				<div className={styles.tourism_index}>{index}</div>
			</div>
			<div className={styles.contents_container}>
				<div className={styles.description_container}>
					<div className={styles.tour_content_type_name}>
						{ContentTypeName['12']}
					</div>
					<div className={styles.tour_subject}>{tourism.title}</div>
					<div className={styles.stay_time}>
						<BsFillStopwatchFill color="#0a0a0a" />
						{`${tourism.stayTime.split(':')[0]}:${
							tourism.stayTime.split(':')[1]
						}`}
					</div>
					<HeartAndStar></HeartAndStar>
				</div>
				<div className={styles.img_container}>
					<Image
						src={`${tourism.tourismImage}`}
						width={200}
						height={150}
						alt={''}
					></Image>
				</div>
			</div>
			{lastItemNumber === index && <div className={styles.last_item}></div>}
		</div>
	);
};

export default ScheduleDetailTourismItem;
