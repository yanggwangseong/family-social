import { periodAtom, PeriodsType } from '@/atoms/periodAtom';
import Field from '@/components/ui/field/Field';
import { FormatDateToString } from '@/utils/formatDateToString';
import { TranslateDateFormat } from '@/utils/translate-date-format';
import { Report } from 'notiflix/build/notiflix-report-aio';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import styles from './PeriodItem.module.scss';
import TimePicker from '@/components/ui/time-picker/TimePicker';
import { useForm } from 'react-hook-form';
import { isAfter, isBefore } from 'date-fns';
import { stringToTime } from '@/utils/string-to-time';
import { useRecoilState } from 'recoil';

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
			if (isBefore(time, startTime)) {
				Report.info(
					`${TranslateDateFormat(date, 'MM/dd')} 종료시간`,
					'종료 시간은 시작 시간 이후여야 합니다.',
					'확인',
				);
				return;
			}
		} else if (name === 'startTime') {
			const endTime = getValues('endTime');
			if (isAfter(time, endTime)) {
				Report.info(
					`${TranslateDateFormat(date, 'MM/dd')} 시작시간`,
					'종료 시간은 시작 시간 이후여야 합니다.',
					'확인',
				);
				return;
			}
		}

		setValue(name, time);
		handleChangePeriod();
	};

	const handleChangePeriod = () => {
		const startTime = getValues('startTime');
		const endTime = getValues('endTime');

		const newPeriod = isPeriods.map(item => {
			if (item.period === period.period) {
				// tourism이 있다면 stayTime을 재조정

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
