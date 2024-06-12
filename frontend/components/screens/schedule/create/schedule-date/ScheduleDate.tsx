import React, { FC, useEffect, useState } from 'react';
import styles from './ScheduleDate.module.scss';
import Field from '@/components/ui/field/Field';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';

import { ScheduleDateProps } from './schedule-date.interface';
import Calendar from '@/components/ui/calendar/Calendar';

const ScheduleDate: FC<ScheduleDateProps> = ({
	handleChangePage,
	onChangeScheduleName,
	isScheduleName,
	onChangePeriods,
	handleChangeDate,
	startDate,
	endDate,
	isPeriodTimes,
}) => {
	const handleChangeScheduleName = (name: string) => {
		onChangeScheduleName(name);
	};

	useEffect(() => {
		if (isPeriodTimes.length > 0) {
			onChangePeriods(isPeriodTimes);
		}
	}, [isPeriodTimes, onChangePeriods]);

	return (
		<div className={styles.main_container}>
			<div className={styles.contents_container}>
				<div className={styles.step_title}>STEP 2</div>

				<div>
					<div className={styles.schedule_name_container}>
						<div className={styles.title}>여행 이름</div>
						<div>
							<Field
								onChange={e => handleChangeScheduleName(e.target.value)}
								defaultValue={isScheduleName}
								placeholder="여행 이름을 작성해주세요."
							></Field>
						</div>
					</div>
					<div className={styles.description_container}>
						<div className={styles.title}>여행 일정 선택</div>
						<div className={styles.subtitle}>여행 기간이 어떻게 되시나요?</div>
						{/* 캘린더 */}
						<Calendar
							startDate={startDate}
							endDate={endDate}
							handleChangeDate={handleChangeDate}
						/>
					</div>
				</div>
			</div>
			<div className={styles.button_container}>
				<CustomButton
					type="button"
					className="mt-8 mb-4 bg-white text-customDark 
							font-bold border border-solid border-customDark 
							rounded-full p-[10px] w-full hover:opacity-80"
					onClick={() => handleChangePage('selectGroupPage')}
				>
					이전
				</CustomButton>
				<CustomButton
					type="button"
					className="mt-8 mb-4 bg-customOrange text-customDark 
					font-bold border border-solid border-customDark 
					rounded-full p-[10px]
					w-full hover:bg-orange-500
					"
					onClick={() => handleChangePage('periodPage')}
				>
					{`다음`}
				</CustomButton>
			</div>
		</div>
	);
};

export default ScheduleDate;
