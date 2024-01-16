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

	const handleCompleTime = (position: number, hour: number, minute: number) => {
		setIsPeriods(prev => {
			return prev.map(value => {
				let tourism;
				if (value.period === isSelectedPeriod) {
					tourism =
						value.tourism &&
						value.tourism.map(item => {
							if (item.position === position) {
								return {
									...item,
									stayTime: `${String(hour).padStart(2, '0')}:${String(
										minute,
									).padStart(2, '0')}`,
								};
							}
							return item; // Return the original item if position doesn't match
						});
				}

				return {
					...value,
					tourism: tourism || value.tourism, // Use original tourism array if it's undefined
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
				></TourismCartItem>
			))}
		</div>
	);
};

export default ScheduleTourism;
