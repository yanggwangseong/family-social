import React, { FC } from 'react';
import styles from './TourismItem.module.scss';
import { TourismItemProps } from './tourism-item.interface';
import Image from 'next/image';

const TourismItem: FC<TourismItemProps> = ({ tour }) => {
	return (
		<div className={styles.container}>
			<div className="flex items-center justify-between">
				<div className="flex">
					<div className={styles.img_container}>
						<Image
							width={120}
							height={100}
							src={tour.firstimage}
							alt="img"
							style={{ height: '100px' }}
						></Image>
					</div>
				</div>
				<div className="flex w-[24px] flex-shrink-0">dd</div>
			</div>
		</div>
	);
};

export default TourismItem;
