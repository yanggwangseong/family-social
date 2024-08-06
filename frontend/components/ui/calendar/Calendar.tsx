import React, { FC } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './Calendar.module.scss';
import { getDateRange } from '@/utils/get-date-range';
import { TranslateDateFormat } from '@/utils/translate-date-format';
import { CgArrowLeft, CgArrowRight } from 'react-icons/cg';
import { CalendarProps } from './calendar.interface';

const Calendar: FC<CalendarProps> = ({
	startDate,
	endDate,
	handleChangeDate,
	datePickerOptions,
}) => {
	const { minDate, maxDate } = datePickerOptions;

	// 요일 반환
	const getDayName = (date: Date) => {
		return date
			.toLocaleDateString('ko-KR', {
				weekday: 'long',
			})
			.slice(0, 1);
	};

	return (
		<div>
			<DatePicker
				className={styles.datePicker}
				locale={ko}
				dateFormat={'yyyy-MM-dd'}
				startDate={startDate}
				endDate={endDate}
				{...datePickerOptions}
				onChange={handleChangeDate}
				dayClassName={d => {
					const start =
						startDate && TranslateDateFormat(startDate, 'yyyy-MM-dd');

					const target = TranslateDateFormat(d, 'yyyy-MM-dd');

					if (start === target) return styles.selectedDay;

					if (startDate && endDate) {
						const end = endDate && TranslateDateFormat(endDate, 'yyyy-MM-dd');
						if (end === target) return styles.selectedDay;

						const rangeDate = getDateRange(start, end).filter(
							value => value !== start && value !== end,
						);

						if (rangeDate.some(value => value === target)) {
							return styles.rangeDay;
						}
					}

					// minDate가 있을경우 그거보다 작을경우 선택 불가
					if (minDate && TranslateDateFormat(minDate, 'yyyy-MM-dd') > target) {
						return `${styles.unselectedDay} ${styles.disabled}`;
					}

					if (maxDate && TranslateDateFormat(maxDate, 'yyyy-MM-dd') < target) {
						return `${styles.unselectedDay} ${styles.disabled}`;
					}

					if (getDayName(d) === '토')
						return `${styles.unselectedDay} ${styles.saturday}`;

					if (getDayName(d) === '일')
						return `${styles.unselectedDay} ${styles.sunday}`;

					return styles.unselectedDay;
				}}
				renderCustomHeader={({
					date,
					changeYear,
					decreaseMonth,
					increaseMonth,
					prevMonthButtonDisabled,
					nextMonthButtonDisabled,
				}) => (
					<div className={styles.customHeaderContainer}>
						<div>
							<button
								onClick={decreaseMonth}
								className={styles.monthButton}
								disabled={prevMonthButtonDisabled}
							>
								<CgArrowLeft size={24} />
							</button>
						</div>
						<div>
							<span className={styles.year_and_month}>
								{`${TranslateDateFormat(date, 'yyyy')}년 ${TranslateDateFormat(
									date,
									'MM',
								)}월`}
							</span>
						</div>
						<div>
							<button
								onClick={increaseMonth}
								className={styles.monthButton}
								disabled={nextMonthButtonDisabled}
							>
								<CgArrowRight size={24} />
							</button>
						</div>
					</div>
				)}
			/>
		</div>
	);
};

export default Calendar;
