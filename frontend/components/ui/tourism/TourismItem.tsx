import React, { FC } from 'react';
import styles from './TourismItem.module.scss';
import { TourismItemProps } from './tourism-item.interface';
import Image from 'next/image';
import { AiFillHeart } from 'react-icons/ai';
import { AiFillStar } from 'react-icons/ai';

const TourismItem: FC<TourismItemProps> = ({ tour }) => {
	return (
		<div className={styles.container}>
			<div className="flex items-center justify-between">
				<div className="flex gap-4">
					<div className={styles.img_container}>
						<Image
							width={120}
							height={100}
							src={tour.firstimage}
							alt="img"
							style={{ height: '100px' }}
						></Image>
					</div>
					<div className="flex flex-col justify-between">
						<div className={styles.tour_title}>{tour.title}</div>
						<div className="flex gap-6">
							<div className={styles.tour_content_type_name}>명소</div>
							<div className={styles.tour_addr}>{tour.addr1}</div>
						</div>
						<div className="flex gap-4">
							<div className="flex items-center gap-2">
								<AiFillHeart size={14} color="#FB1F42" />
								<span className="text-sm">0</span>
							</div>
							<div className="flex items-center gap-2">
								<AiFillStar size={14} color="rgb(253, 224, 71)" />
								<span className="text-sm">0</span>
							</div>
						</div>
					</div>
				</div>
				<div className="flex w-[24px] flex-shrink-0">dd</div>
			</div>
		</div>
	);
};

export default TourismItem;
