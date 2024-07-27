import { PeriodsType } from '@/atoms/periodAtom';
import Field from '@/components/ui/field/Field';
import { FormatDateToString } from '@/utils/formatDateToString';
import { TranslateDateFormat } from '@/utils/translate-date-format';
import { Report } from 'notiflix/build/notiflix-report-aio';
import React, { ChangeEvent, FC, useState } from 'react';
import styles from './PeriodItem.module.scss';
import TimePicker from '@/components/ui/time-picker/TimePicker';
import { useForm } from 'react-hook-form';

const PeriodItem: FC<{ period: PeriodsType }> = ({ period }) => {
	const [startTime, setStartTime] = useState(period.startTime || '10:00');
	const [endTime, setEndTime] = useState(period.endTime || '22:00');
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
	});

	const handleChangeTime = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		if (name === 'startTime') {
			if (value >= endTime) {
				e.currentTarget.blur();
				Report.info(
					`${TranslateDateFormat(date, 'MM/dd')} 시작시간`,
					'종료 시간은 시작 시간 이후여야 합니다.',
					'확인',
				);
				return;
			}
			setStartTime(value);
		} else if (name === 'endTime') {
			if (value <= startTime) {
				e.currentTarget.blur();
				Report.info(
					`${TranslateDateFormat(date, 'MM/dd')} 종료시간`,
					'종료 시간은 시작 시간 이후여야 합니다.',
					'확인',
				);
				return;
			}
			setEndTime(value);
		}
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
					<TimePicker control={control} name="testStartTime"></TimePicker>
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
					<TimePicker control={control} name="testEndTime"></TimePicker>
				</td>
			</tr>
		</>
	);
};

export default PeriodItem;
