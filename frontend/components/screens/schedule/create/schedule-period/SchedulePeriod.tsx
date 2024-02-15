import React, { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react';
import styles from './SchedulePeriod.module.scss';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { SchedulePeriodProps } from './schedule-period.interface';
import { Union, schdulePages } from 'types';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendar } from 'react-icons/fa';
import { getDateRange } from '@/utils/get-date-range';
import Periods from '@/components/ui/schedule/period/Periods';
import { PeriodsType } from '@/atoms/periodAtom';
import { useRecoilState } from 'recoil';
import { selectedPeriodAtom } from '@/atoms/selectedPeriodAtom';
import Field from '@/components/ui/field/Field';
import { TranslateDateFormat } from '@/utils/translate-date-format';

const SchedulePeriod: FC<SchedulePeriodProps> = ({
	onChangePage,
	onChangePeriods,
	onChangeScheduleName,
	onChangeStartEndPeriod,
	isPeriods,
	isScheduleName,
	updateStartDate,
	updateEndDate,
}) => {
	const [isSelectedPeriod, setIsSelectedPeriod] =
		useRecoilState(selectedPeriodAtom);

	const [isPeriodTimes, setIsPeriodTimes] = useState<PeriodsType[]>();

	const [pageInit, setPageInit] = useState<boolean>(false);

	const [dateRange, setDateRange] = useState<Date[]>([
		updateStartDate ? new Date(updateStartDate) : new Date(),
		updateEndDate ? new Date(updateEndDate) : new Date(),
	]);
	const [startDate, endDate] = dateRange;

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleChangePage = (page: Union<typeof schdulePages>) => {
		onChangePage(page);
	};

	const handleChange = (dates: [Date, Date]) => {
		setDateRange(dates);
	};

	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsOpen(!isOpen);
	};

	const selectedDates = () => {
		setIsOpen(false);
		!pageInit && setPageInit(true);

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

	const handleChangeScheduleName = (name: string) => {
		onChangeScheduleName(name);
	};

	useEffect(() => {
		if (isPeriodTimes) {
			onChangePeriods(isPeriodTimes);
		}
	}, [isPeriodTimes, onChangePeriods]);

	return (
		<div className={styles.period_container}>
			<div className={styles.step_title}>STEP 2</div>

			{isOpen || !pageInit ? (
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
						onChange={handleChange}
						inline
						isClearable={true}
					/>
				</div>
			) : (
				<>
					<div className={styles.period_btn_container}>
						<button className="example-custom-input" onClick={handleClick}>
							{`${TranslateDateFormat(
								startDate,
								'yyyy-MM-dd (eee)',
							)} - ${TranslateDateFormat(endDate, 'yyyy-MM-dd (eee)')}`}
						</button>
						<FaCalendar className={styles.icon} size={22} />
					</div>
					{/* 여행기간 */}
					<Periods isPeriods={isPeriods}></Periods>
				</>
			)}

			<div className={styles.button_container}>
				{isOpen || !pageInit ? (
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
				) : (
					<>
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
							onClick={() => handleChangePage('tourismPage')}
						>
							다음
						</CustomButton>
					</>
				)}
			</div>
		</div>
	);
};

export default SchedulePeriod;
