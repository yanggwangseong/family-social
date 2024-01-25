import React, { FC, useEffect, useState } from 'react';
import styles from './Tourism.module.scss';
import Image from 'next/image';
import { ContentTypeName } from '@/constants/content-type.constant';
import { ScheduleTourismProps } from './tourism.interface';
import { TourismType, periodAtom } from '@/atoms/periodAtom';
import { useSortable } from '@/hooks/useSortable';
import TourismCartItem from './tourism-cart-item/TourismCartItem';
import { useRecoilState } from 'recoil';
import { selectedPeriodAtom } from '@/atoms/selectedPeriodAtom';

const ScheduleTourism: FC<ScheduleTourismProps> = ({ tourList }) => {
	const [isPeriods, setIsPeriods] = useRecoilState(periodAtom);

	const [isSelectedPeriod, setIsSelectedPeriod] =
		useRecoilState(selectedPeriodAtom);

	const {
		handleDragOver,
		handleDragStart,
		handleDragEnd,
		handleDragEnter,
		handleDragLeave,
		handleDrop,
		lists,
	} = useSortable<TourismType, HTMLDivElement>(tourList);

	const handleDelteTourismItem = (contentId: string) => {
		setIsPeriods(prev => {
			return prev.map(value => {
				if (value.period === isSelectedPeriod && value.tourisms) {
					const updatedTourism = value.tourisms.filter(
						item => item.contentId !== contentId,
					);

					return {
						...value,
						tourisms: updatedTourism,
					};
				}

				return value;
			});
		});
	};

	const handleCompleTime = (position: number, hour: number, minute: number) => {
		setIsPeriods(prev => {
			return prev.map(value => {
				let tourisms;
				if (value.period === isSelectedPeriod) {
					tourisms =
						value.tourisms &&
						value.tourisms.map(item => {
							if (item.position === position) {
								return {
									...item,
									stayTime: `${String(hour)}:${String(minute)}`,
								};
							}
							return item;
						});
				}

				return {
					...value,
					tourisms: tourisms || value.tourisms,
				};
			});
		});
	};

	return (
		<div className={styles.wrap}>
			{lists.map((item, index) => (
				<TourismCartItem
					key={index}
					dataPosition={index}
					item={item}
					onDragOver={handleDragOver}
					onDragStart={handleDragStart}
					onDragEnd={handleDragEnd}
					onDrop={handleDrop}
					onDragEnter={handleDragEnter}
					onDragLeave={handleDragLeave}
					onCompleTime={handleCompleTime}
					onDelteTourismItem={handleDelteTourismItem}
				></TourismCartItem>
			))}
		</div>
	);
};

export default ScheduleTourism;
