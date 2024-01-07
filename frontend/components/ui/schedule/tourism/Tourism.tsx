import React, { FC } from 'react';
import styles from './Tourism.module.scss';
import Image from 'next/image';
import { TourismType } from '@/atoms/periodAtom';
import { ContentTypeName } from '@/constants/content-type.constant';

const ScheduleTourism: FC<TourismType> = ({
	contentId,
	tourismImage,
	title,
	position,
}) => {
	return (
		<div className={styles.schedule_tourism_container}>
			<div className={styles.order_container}>
				<div className={styles.order_number}>{position + 1}</div>
			</div>
			<div className={styles.container}>
				<div className={styles.tour_item_card}>
					<div className={styles.tour_img_title_container}>
						<div className={styles.img_container}>
							<Image
								width={45}
								height={45}
								src={tourismImage}
								alt="img"
								style={{ height: '45px' }}
							></Image>
						</div>
						<div className={styles.tour_description_container}>
							<div className={styles.tour_title}>{title}</div>
							<div className={styles.tour_addr_container}>
								<div className={styles.tour_content_type_name}>
									{ContentTypeName['12']}
								</div>
							</div>
						</div>
					</div>
					<div className={styles.tour_right_btn_container}>
						<div className={styles.stay_time}>2시간 0분</div>
						<div className={styles.close_btn}>x</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ScheduleTourism;
