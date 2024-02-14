import React, { FC } from 'react';
import styles from './DetailTourismItem.module.scss';
import Image from 'next/image';
import { BsFillStopwatchFill } from 'react-icons/bs';
import { GoDotFill } from 'react-icons/go';
import HeartAndStar from '@/components/ui/heart-and-star/HeartAndStar';

const ScheduleDetailTourismItem: FC<{
	index: number;
	lastItemNumber: number;
}> = ({ index, lastItemNumber }) => {
	return (
		<div className={styles.container}>
			<div className={styles.top_container}>
				<div className={styles.tourism_index}>{index}</div>
			</div>
			<div className={styles.contents_container}>
				<div className={styles.description_container}>
					<div className={styles.tour_content_type_name}>명소</div>
					<div className={styles.tour_subject}>감로암(서울)</div>
					<div className={styles.stay_time}>
						<BsFillStopwatchFill />
						02:40
					</div>
					<HeartAndStar></HeartAndStar>
				</div>
				<div className="ml-auto border border-solid border-customDark">
					<Image
						src={`http://tong.visitkorea.or.kr/cms/resource/85/2031885_image2_1.jpg`}
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
