import React, { FC } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './Calendar.module.scss';

const Calendar: FC<{
	startDate: Date;
	endDate: Date;
	handleChangeDate: (dates: [Date, Date]) => void;
}> = ({ startDate, endDate, handleChangeDate }) => {
	return (
		<div>
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
	);
};

export default Calendar;
