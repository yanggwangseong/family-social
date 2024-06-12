import React, { FC, useEffect, useState } from 'react';
import styles from './ScheduleDate.module.scss';
import Field from '@/components/ui/field/Field';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { TranslateDateFormat } from '@/utils/translate-date-format';
import { getDateRange } from '@/utils/get-date-range';
import { useRecoilState } from 'recoil';
import { selectedPeriodAtom } from '@/atoms/selectedPeriodAtom';
import { PeriodsType } from '@/atoms/periodAtom';

const ScheduleDate: FC<{
	onChangeScheduleName: (name: string) => void;
	isScheduleName: string;
	onChangeStartEndPeriod: (startPeriod: string, endPeriod: string) => void;
	onChangePeriods: (dates: PeriodsType[]) => void;
}> = ({
	onChangeScheduleName,
	isScheduleName,
	onChangeStartEndPeriod,
	onChangePeriods,
}) => {
	const [isSelectedPeriod, setIsSelectedPeriod] =
		useRecoilState(selectedPeriodAtom);

	const [isPeriodTimes, setIsPeriodTimes] = useState<PeriodsType[]>();

	const [dateRange, setDateRange] = useState<Date[]>([new Date(), new Date()]);
	const [startDate, endDate] = dateRange;

	const handleChangeDate = (dates: [Date, Date]) => {
		setDateRange(dates);
	};

	const handleChangeScheduleName = (name: string) => {
		onChangeScheduleName(name);
	};

	const selectedDates = () => {
		//setIsOpen(false);
		//!pageInit && setPageInit(true);

		const startPeriod = TranslateDateFormat(startDate, 'yyyy-MM-dd');

		const endPeriod = TranslateDateFormat(endDate, 'yyyy-MM-dd');

		const dates = getDateRange(startPeriod, endPeriod);

		// 시작기간 종료기간
		onChangeStartEndPeriod(startPeriod, endPeriod);

		setIsSelectedPeriod(dates[0]);

		setIsPeriodTimes(
			dates.map(date => ({
				period: date,
				startTime: '10:00',
				endTime: '22:00',
			})),
		);
	};

	useEffect(() => {
		if (isPeriodTimes) {
			onChangePeriods(isPeriodTimes);
		}
	}, [isPeriodTimes, onChangePeriods]);

	return (
		<div className={styles.period_container}>
			<div className={styles.contents_container}>
				<div className={styles.step_title}>STEP 2</div>
			</div>
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
				<div className={styles.title}>여행 일정 선택</div>
				<div>여행 기간이 어떻게 되시나요?</div>
				<DatePicker
					locale={ko}
					selectsRange={true}
					startDate={startDate}
					endDate={endDate}
					onChange={handleChangeDate}
					inline
					isClearable={true}
				/>
			</div>
			<div className={styles.button_container}>
				<CustomButton
					type="button"
					className="mt-8 mb-4 bg-customOrange text-customDark 
					font-bold border border-solid border-customDark 
					rounded-full p-[10px]
					w-full hover:bg-orange-500
					"
					onClick={selectedDates}
				>
					{`선택`}
				</CustomButton>
			</div>
		</div>
	);
};

export default ScheduleDate;
