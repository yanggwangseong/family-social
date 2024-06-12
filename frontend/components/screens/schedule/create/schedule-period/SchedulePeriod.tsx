import React, { FC } from 'react';
import styles from './SchedulePeriod.module.scss';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { SchedulePeriodProps } from './schedule-period.interface';
import { Union, schdulePages } from 'types';

import { FaCalendar } from 'react-icons/fa';

import Periods from '@/components/ui/schedule/period/Periods';

import { TranslateDateFormat } from '@/utils/translate-date-format';

const SchedulePeriod: FC<SchedulePeriodProps> = ({
	onChangePage,
	isPeriods,
	startDate,
	endDate,
}) => {
	const handleChangePage = (page: Union<typeof schdulePages>) => {
		onChangePage(page);
	};

	return (
		<div className={styles.period_container}>
			<div className={styles.contents_container}>
				<div className={styles.step_title}>STEP 3</div>

				<div className={styles.period_btn_container}>
					<button
						className="example-custom-input"
						onClick={() => handleChangePage('scheduleDatePage')}
					>
						{`${TranslateDateFormat(
							startDate,
							'yyyy-MM-dd (eee)',
						)} - ${TranslateDateFormat(endDate, 'yyyy-MM-dd (eee)')}`}
					</button>
					<FaCalendar className={styles.icon} size={22} />
				</div>
				{/* 여행기간 */}
				<Periods isPeriods={isPeriods}></Periods>
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
					onClick={() => handleChangePage('tourismPage')}
				>
					다음
				</CustomButton>
			</div>
		</div>
	);
};

export default SchedulePeriod;
