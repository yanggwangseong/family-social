import { periodAtom, PeriodsType } from '@/atoms/periodAtom';
import Field from '@/components/ui/field/Field';
import { FormatDateToString } from '@/utils/formatDateToString';
import { TranslateDateFormat } from '@/utils/translate-date-format';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import styles from './PeriodItem.module.scss';
import TimePicker from '@/components/ui/time-picker/TimePicker';
import { useForm } from 'react-hook-form';
import { isAfter, isBefore, isEqual } from 'date-fns';
import { stringToTime } from '@/utils/string-to-time';
import { useRecoilState } from 'recoil';
import { calculateTimeDifference } from '@/utils/calculate-time-defference';

const PeriodItem: FC<{ period: PeriodsType }> = ({ period }) => {
	//const [startTime, setStartTime] = useState(period.startTime || '10:00');
	//const [endTime, setEndTime] = useState(period.endTime || '22:00');

	const [isPeriods, setIsPeriods] = useRecoilState(periodAtom);

	const date = FormatDateToString(period.period);

	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		reset,
		getValues,
		watch,
		control,
		setValue,
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			startTime: stringToTime(period.startTime),
			endTime: stringToTime(period.endTime),
		},
	});

	const hanldeChangeTime = (name: 'startTime' | 'endTime', time: Date) => {
		if (name === 'endTime') {
			const startTime = getValues('startTime');
			if (isBefore(time, startTime) || isEqual(time, startTime)) {
				Report.info(
					`${TranslateDateFormat(date, 'MM/dd')} 종료시간`,
					'종료 시간은 시작 시간 이후여야 합니다.',
					'확인',
				);
				return;
			}
		} else if (name === 'startTime') {
			const endTime = getValues('endTime');
			if (isAfter(time, endTime) || isEqual(time, endTime)) {
				Report.info(
					`${TranslateDateFormat(date, 'MM/dd')} 시작시간`,
					'종료 시간은 시작 시간 이후여야 합니다.',
					'확인',
				);
				return;
			}
		}

		const updateTime = () => {
			setValue(name, time);
			handleChangePeriod();
		};

		if (period.tourisms && period.tourisms.length > 0) {
			Confirm.show(
				'관광 아이템 머무르는 시간',
				`${TranslateDateFormat(
					date,
					'MM/dd',
				)}일에 이미 설정한 관광 아이템의 머무르는 시간이 초기화 되어도 괜찮습니까?`,
				'네',
				'아니요',
				updateTime,
				() => {
					return false;
				},
				{},
			);
		} else {
			updateTime();
		}
	};

	const handleChangePeriod = () => {
		const startTime = getValues('startTime');
		const endTime = getValues('endTime');

		const newPeriod = isPeriods.map(item => {
			if (item.period === period.period) {
				let updatedTourisms = item.tourisms;
				// tourism이 있다면 stayTime을 재조정

				if (item.tourisms && item.tourisms.length > 0) {
					const totalTime = calculateTimeDifference(startTime, endTime);

					const commonDivider = Math.floor(totalTime / item.tourisms.length);

					const remainder = totalTime % item.tourisms.length;

					updatedTourisms = [...item.tourisms]
						.sort((a, b) => a.position - b.position)
						.map((tourism, index) => {
							const stayTimeInMinutes =
								index === item.tourisms!.length - 1
									? commonDivider + remainder
									: commonDivider;

							const hours = Math.floor(stayTimeInMinutes / 60);
							const minutes = stayTimeInMinutes % 60;
							const stayTime = `${String(hours).padStart(2, '0')}:${String(
								minutes,
							).padStart(2, '0')}`;

							return {
								...tourism,
								stayTime,
							};
						});
				}

				return {
					...item,
					startTime: TranslateDateFormat(
						startTime ? startTime : new Date('10:00'),
						'HH:mm',
					),
					endTime: TranslateDateFormat(
						endTime ? endTime : new Date('22:00'),
						'HH:mm',
					),
					tourisms: updatedTourisms,
				};
			}
			return item;
		});

		setIsPeriods(newPeriod);
	};

	return (
		<>
			<tr>
				<td className={styles.table_row} align="center" rowSpan={2}>
					{TranslateDateFormat(date, 'MM/dd')}
				</td>
				<td className={styles.table_row} align="center" rowSpan={2}>
					{TranslateDateFormat(date, 'eee')}
				</td>
				<td className={`${styles.table_row} ${styles.no_boder}`} align="center">
					{/* <Field
						className="w-full bg-basic md:text-base text-sm"
						type="time"
						name="startTime"
						value={startTime}
						onChange={handleChangeTime}
					/> */}
					<TimePicker
						control={control}
						name="startTime"
						onChangeTime={hanldeChangeTime}
					></TimePicker>
				</td>
			</tr>
			<tr>
				<td className={styles.table_row} align="center">
					{/* <Field
						className="w-full bg-basic md:text-base text-sm"
						type="time"
						required={true}
						name="endTime"
						min="05:00"
						max="00:00"
						step="900"
						value={endTime}
						onChange={handleChangeTime}
					/> */}
					<TimePicker
						control={control}
						name="endTime"
						onChangeTime={hanldeChangeTime}
					></TimePicker>
				</td>
			</tr>
		</>
	);
};

export default PeriodItem;
