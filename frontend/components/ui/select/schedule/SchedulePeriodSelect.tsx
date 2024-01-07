import React, { FC, useState } from 'react';
import {
	AiOutlineCheck,
	AiOutlineEye,
	AiOutlineSchedule,
} from 'react-icons/ai';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import styles from './SchedulePeriodSelect.module.scss';
import { useRecoilState } from 'recoil';
import { PeriodsType, periodAtom } from '@/atoms/periodAtom';
import cn from 'classnames';
import { SchedulePeriodSelectProps } from './schedule-period-select.interface';

const SchedulePeriodSelect: FC<SchedulePeriodSelectProps> = ({
	selectedDate,
	onSelectedPeriod,
}) => {
	const [isPeriods] = useRecoilState(periodAtom);

	const [isSelectToggle, setIsSelectToggle] = useState<boolean>(false);

	const handleSelectToggle = () => {
		setIsSelectToggle(!isSelectToggle);
	};

	const handleSelectedPeriod = (period: PeriodsType) => {
		onSelectedPeriod(period);
		setIsSelectToggle(!isSelectToggle);
	};

	return (
		<div className={styles.public_select_container}>
			<div className={styles.toggle_container} onClick={handleSelectToggle}>
				<div>
					<AiOutlineSchedule size={22} />
				</div>
				<div className={styles.option_text}>{`${
					isPeriods.findIndex(item => item.period === selectedDate) + 1
				}일차 ${selectedDate}`}</div>
				<div>
					{isSelectToggle ? (
						<MdKeyboardArrowDown size={22} />
					) : (
						<MdKeyboardArrowUp size={22} />
					)}
				</div>
			</div>
			{isSelectToggle && (
				<div className={styles.select_layer_modal_container}>
					<div className={styles.modal_title_container}>
						<div>
							<AiOutlineEye size={22} />
						</div>
						<div className={styles.modal_title}>
							여행 일자별 관광 순서 및 시간 설정
						</div>
					</div>
					{isPeriods.map((period, index) => (
						<div
							key={index}
							className={cn(styles.select_item, {
								[styles.active]: selectedDate === period.period,
							})}
							onClick={() => handleSelectedPeriod(period)}
						>
							{`${index + 1}일차 ${period.period}`}
							{selectedDate === period.period && (
								<div className={styles.icon_container}>
									<AiOutlineCheck size={14} color="#e5855d" />
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default SchedulePeriodSelect;
