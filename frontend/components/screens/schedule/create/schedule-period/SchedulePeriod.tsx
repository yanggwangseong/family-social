import React, { ChangeEvent, FC, MouseEvent, useState } from 'react';
import styles from './SchedulePeriod.module.scss';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { SchedulePeriodProps } from './schedule-period.interface';
import { Union, schdulePages } from 'types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import { FaCalendar } from 'react-icons/fa';
import { getDateRange } from '@/utils/get-date-range';
import Periods from '@/components/ui/schedule/period/Periods';

const SchedulePeriod: FC<SchedulePeriodProps> = ({ onChangePage }) => {
	const [pageInit, setPageInit] = useState<boolean>(false);

	const [dateRange, setDateRange] = useState<Date[]>([new Date(), new Date()]);
	const [startDate, endDate] = dateRange;
	const [isPeriods, setIsPeriods] = useState<string[]>([]);

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

		const dates = getDateRange(
			format(startDate, 'yyyy-MM-dd', {
				locale: ko,
			}),
			format(endDate, 'yyyy-MM-dd', {
				locale: ko,
			}),
		);

		setIsPeriods(dates);
	};

	return (
		<div className={styles.period_container}>
			<div className={styles.step_title}>STEP 2</div>
			<div className={styles.title}>여행 일정 선택</div>
			{isOpen || !pageInit ? (
				<div>
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
							{`${format(startDate, 'yyyy-MM-dd (eee)', {
								locale: ko,
							})} - ${format(endDate, 'yyyy-MM-dd (eee)', {
								locale: ko,
							})}`}
						</button>
						<FaCalendar className={styles.icon} size={22} />
					</div>
					{/* 여행기간 */}
					<Periods></Periods>
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
