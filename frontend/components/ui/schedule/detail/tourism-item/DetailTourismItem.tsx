import React, { FC } from 'react';
import styles from './DetailTourismItem.module.scss';
import Image from 'next/image';
import { BsFillStopwatchFill } from 'react-icons/bs';
import HeartAndStar from '@/components/ui/heart-and-star/HeartAndStar';
import { TourismResponse } from '@/shared/interfaces/schedule.interface';
import { ContentTypeName } from '@/constants/content-type.constant';
import { useTourismDetailLayerModal } from '@/hooks/useTourismDetailLayerModal';
import { motion } from 'framer-motion';
import { easeOutAnimation } from '@/utils/animation/ease-out';
const visible = {
	opacity: 1,
	y: 0,
	transition: { duration: 0.5 },
};
const itemVariants = {
	hidden: { opacity: 0, y: 10 },
	visible,
};

const ScheduleDetailTourismItem: FC<{
	index: number;
	lastItemNumber: number;
	tourism: TourismResponse;
}> = ({ index, lastItemNumber, tourism }) => {
	const { handleTourismDetailLayerModal } = useTourismDetailLayerModal(
		tourism.title,
	);

	return (
		<motion.div variants={itemVariants} className={styles.container}>
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
				<div
					className={styles.img_container}
					onClick={() => handleTourismDetailLayerModal(tourism.contentId, '12')}
				>
					<Image src={`${tourism.tourismImage}`} fill alt={''}></Image>
				</div>
			</div>
			{lastItemNumber === index && <div className={styles.last_item}></div>}
		</motion.div>
	);
};

export default ScheduleDetailTourismItem;
