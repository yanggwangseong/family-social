import React, { FC, useEffect, useState } from 'react';
import styles from './Tourism.module.scss';
import Image from 'next/image';
import { ContentTypeName } from '@/constants/content-type.constant';
import { ScheduleTourismProps } from './tourism.interface';
import { PeriodsType, TourismType, periodAtom } from '@/atoms/periodAtom';
import { useSortable } from '@/hooks/useSortable';
import TourismCartItem from './tourism-cart-item/TourismCartItem';
import { useRecoilState } from 'recoil';
import { selectedPeriodAtom } from '@/atoms/selectedPeriodAtom';
import { differenceInMinutes, getHours, getMinutes } from 'date-fns';
import { stringToTime } from '@/utils/string-to-time';

const ScheduleTourism: FC<ScheduleTourismProps> = ({ tourList }) => {
	const [isPeriods, setIsPeriods] = useRecoilState(periodAtom);

	const [isSelectedPeriod, setIsSelectedPeriod] =
		useRecoilState(selectedPeriodAtom);

	const handleSetList = (
		grap: TourismType,
		target: TourismType,
		list: TourismType[],
	) => {
		setIsPeriods(prev => {
			return prev.map(value => {
				if (value.period === isSelectedPeriod && value.tourisms) {
					const updatedTourism = list.map(item => {
						if (item.contentId === grap.contentId) {
							// grap의 position을 target의 position으로 변경
							return {
								...item,
								position: target.position,
							};
						}

						if (item.contentId === target.contentId) {
							// target의 position을 grap의 position으로 변경
							return {
								...item,
								position: grap.position,
							};
						}

						return item; // 다른 항목은 변경하지 않음
					});

					return {
						...value,
						tourisms: updatedTourism,
					};
				}

				return value; // period가 일치하지 않으면 그대로 반환
			});
		});
	};

	const {
		handleDragOver,
		handleDragStart,
		handleDragEnd,
		handleDragEnter,
		handleDragLeave,
		handleDrop,
		lists,
	} = useSortable<TourismType, HTMLDivElement>(tourList, handleSetList);

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

	/**
	 *
	 * @param position 관광 아이템 순서
	 * @param hour 머무르는 시간
	 * @param minute 머무르는 분
	 */
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
									stayTime: `${String(hour).padStart(2, '0')}:${String(
										minute,
									).padStart(2, '0')}`,
									stayTimeWritable: true,
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

	// const calculateTimeDifference = (startTime: Date, endTime: Date): number => {
	// 	return differenceInMinutes(endTime, startTime);
	// };

	// const calculateTime = (time: Date) => {
	// 	const hours = getHours(time);
	// 	const minutes = getMinutes(time);

	// 	return hours * 60 + minutes;
	// };

	// useEffect(() => {
	// 	console.log('tourList 변경시에 호출');

	// 	setIsPeriods(prev => {
	// 		return prev.map(value => {
	// 			let tourisms;
	// 			if (value.period === isSelectedPeriod && value.tourisms) {
	// 				const writableTime = value.tourisms.reduce(
	// 					(prev, cur) =>
	// 						cur.stayTimeWritable
	// 							? 0
	// 							: calculateTime(stringToTime(cur.stayTime)) + prev,
	// 					0,
	// 				);

	// 				console.log('***writableTime***=', writableTime);
	// 				const totalTime = calculateTimeDifference(
	// 					stringToTime(value.startTime),
	// 					stringToTime(value.endTime),
	// 				);

	// 				const commonDivider = Math.floor(totalTime / value.tourisms.length);

	// 				const remainder = totalTime % value.tourisms.length;

	// 				tourisms = value.tourisms.map((item, index) => {
	// 					const stayTimeInMinutes =
	// 						index === value.tourisms!.length - 1
	// 							? commonDivider + remainder
	// 							: commonDivider;

	// 					const hours = Math.floor(stayTimeInMinutes / 60);
	// 					const minutes = stayTimeInMinutes % 60;
	// 					const stayTime = `${String(hours).padStart(2, '0')}:${String(
	// 						minutes,
	// 					).padStart(2, '0')}`;

	// 					item.stayTimeWritable; // false 일때

	// 					return {
	// 						...item,
	// 						stayTime,
	// 					};
	// 				});
	// 			}

	// 			return {
	// 				...value,
	// 				tourisms: tourisms || value.tourisms,
	// 			};
	// 		});
	// 	});
	// }, [isSelectedPeriod, setIsPeriods, tourList]);

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
