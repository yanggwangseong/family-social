import React, { ChangeEvent, FC, MouseEvent, useState } from 'react';
import styles from './SchedulePeriod.module.scss';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { SchedulePeriodProps } from './schedule-period.interface';
import { Union, schdulePages } from 'types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { format } from 'date-fns';

const SchedulePeriod: FC<SchedulePeriodProps> = ({ onChangePage }) => {
	const handleChangePage = (page: Union<typeof schdulePages>) => {
		onChangePage(page);
	};

	const [dateRange, setDateRange] = useState([new Date(), new Date()]);
	const [startDate, endDate] = dateRange;

	const [isOpen, setIsOpen] = useState(false);
	const handleChange = (e: any) => {
		setDateRange(e);
	};
	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsOpen(!isOpen);
	};

	const selectedDates = () => {
		setIsOpen(false);

		const formattedDate = format(startDate, 'yyyy-MM-dd (eee)', { locale: ko });
		console.log(formattedDate);
	};

	return (
		<div className={styles.period_container}>
			<div className={styles.step_title}>STEP 2</div>
			<div className={styles.title}>여행 기간이 어떻게 되시나요?</div>
			<button className="example-custom-input" onClick={handleClick}>
				{`버튼`}
			</button>
			{isOpen && (
				<>
					<DatePicker
						locale={ko}
						selectsRange={true}
						startDate={startDate}
						endDate={endDate}
						onChange={handleChange}
						inline
						isClearable={true}
					/>
					<button type="button" onClick={selectedDates}>
						{`선택`}
					</button>
				</>
			)}

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
				>
					다음
				</CustomButton>
			</div>
		</div>
	);
};

export default SchedulePeriod;
