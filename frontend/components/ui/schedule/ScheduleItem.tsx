import React, { FC } from 'react';
import Image from 'next/image';
import { BsThreeDots } from 'react-icons/bs';
import styles from './ScheduleItem.module.scss';

const ScheduleItem: FC = () => {
	return (
		<div className={styles.schedule_card_container}>
			<div className={styles.img_container}>
				<Image fill src={'/images/banner/group-base.png'} alt="banner"></Image>
			</div>
			<div className={styles.schedule_card_contents_container}>
				<div className={styles.contents_top_container}>
					<div className={styles.d_day}>D-248</div>
					<div className={styles.title}>2024년 가족 여름휴가</div>
					<div className={styles.setting_container}>
						<BsThreeDots size={24} />
					</div>
				</div>
				<div className={styles.schedule_periods}>2024-07-24 ~ 2024-07-28</div>
				<div className={styles.update_date}>최근 수정일 2024-01-25</div>
			</div>
		</div>
	);
};

export default ScheduleItem;
