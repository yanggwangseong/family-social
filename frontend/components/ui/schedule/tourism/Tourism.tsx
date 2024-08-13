import React, { FC, useEffect } from 'react';
import styles from './Tourism.module.scss';
import { ScheduleTourismProps } from './tourism.interface';
import { TourismType, periodAtom } from '@/atoms/periodAtom';
import { useSortable } from '@/hooks/useSortable';
import TourismCartItem from './tourism-cart-item/TourismCartItem';
import { useRecoilState } from 'recoil';
import { selectedPeriodAtom } from '@/atoms/selectedPeriodAtom';
import { differenceInMinutes, getHours, getMinutes } from 'date-fns';
import { stringToTime } from '@/utils/string-to-time';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { calculateTimeDifference } from '@/utils/calculate-time-defference';
import { calculateTime } from '@/utils/calculate-time';

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
						// grap의 position을 target의 position으로 변경
						if (item.contentId === grap.contentId) {
							return { ...item, position: target.position };
							// target의 position을 grap의 position으로 변경
						} else if (item.contentId === target.contentId) {
							return { ...item, position: grap.position };
						}
						return item;
					});

					return {
						...value,
						tourisms: updatedTourism,
					};
				}
				return value;
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
				let tourisms: TourismType[] | undefined;
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

					const totalTime = calculateTimeDifference(
						stringToTime(value.startTime),
						stringToTime(value.endTime),
					);

					const useStayTime = tourisms!.reduce(
						(prev, cur) => prev + calculateTime(stringToTime(cur.stayTime)),
						0,
					);

					if (useStayTime > totalTime) {
						Report.info(
							`총 시간`,
							'머무르는 시간은 총시간을 초과 할 수 없습니다',
							'확인',
						);
						return value;
					}
				}

				return {
					...value,
					tourisms: tourisms || value.tourisms,
				};
			});
		});
	};

	useEffect(() => {
		setIsPeriods(prev => {
			return prev.map(value => {
				if (value.period !== isSelectedPeriod || !value.tourisms) {
					return value;
				}

				const writableTime = value.tourisms.reduce(
					(prev, cur) =>
						cur.stayTimeWritable
							? prev + calculateTime(stringToTime(cur.stayTime))
							: prev,
					0,
				);

				const unWritableTourism = value.tourisms.filter(
					item => !item.stayTimeWritable,
				);

				if (unWritableTourism.length === 0) return value;

				const totalTime =
					calculateTimeDifference(
						stringToTime(value.startTime),
						stringToTime(value.endTime),
					) - writableTime;

				const commonDivider = Math.floor(totalTime / unWritableTourism.length);
				const remainder = totalTime % unWritableTourism.length;

				const tourisms = value.tourisms.map((item, index) => {
					const stayTimeInMinutes =
						index === value.tourisms!.length - 1
							? commonDivider + remainder
							: commonDivider;

					const hours = Math.floor(stayTimeInMinutes / 60);
					const minutes = stayTimeInMinutes % 60;
					const stayTime = `${String(hours).padStart(2, '0')}:${String(
						minutes,
					).padStart(2, '0')}`;

					// stayTimeWritable가 false일 때만 업데이트
					if (!item.stayTimeWritable && item.stayTime !== stayTime) {
						return {
							...item,
							stayTime,
						};
					}

					return item;
				});

				// 상태가 변경되지 않으면 원래 상태를 반환하여 업데이트 방지
				if (JSON.stringify(value.tourisms) === JSON.stringify(tourisms)) {
					return value;
				}

				return {
					...value,
					tourisms,
				};
			});
		});
	}, [isSelectedPeriod, setIsPeriods, tourList]);

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
