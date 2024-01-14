import React, { FC, useState } from 'react';
import styles from './Tourism.module.scss';
import Image from 'next/image';
import { ContentTypeName } from '@/constants/content-type.constant';
import { ScheduleTourismProps } from './tourism.interface';
import { TourismType } from '@/atoms/periodAtom';
import { useSortable } from '@/hooks/useSortable';

const ScheduleTourism: FC<ScheduleTourismProps> = ({ tourList }) => {
	const {
		handleDragOver,
		handleDragStart,
		handleDragEnd,
		handleDragEnter,
		handleDragLeave,
		handleDrop,
		lists,
	} = useSortable<TourismType, HTMLDivElement>(tourList);

	return (
		<div className={styles.container}>
			{lists.map((item, index) => (
				<div
					className={styles.schedule_tourism_container}
					key={index}
					data-position={index}
					onDragOver={handleDragOver}
					onDragStart={handleDragStart}
					onDragEnd={handleDragEnd}
					onDrop={handleDrop}
					onDragEnter={handleDragEnter}
					onDragLeave={handleDragLeave}
					draggable
				>
					<div className={styles.order_container}>
						<div className={styles.order_number}>{index}</div>
					</div>
					<div className={styles.container}>
						<div className={styles.tour_item_card}>
							<div className={styles.tour_img_title_container}>
								<div className={styles.img_container}>
									<Image
										width={45}
										height={45}
										src={item.tourismImage}
										alt="img"
										style={{ height: '45px' }}
									></Image>
								</div>
								<div className={styles.tour_description_container}>
									<div className={styles.tour_title}>{item.title}</div>
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
			))}
		</div>
	);
};

export default ScheduleTourism;
