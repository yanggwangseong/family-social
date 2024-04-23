import React, { FC, useState } from 'react';
import {
	AiOutlineCheck,
	AiOutlineEye,
	AiOutlineSchedule,
} from 'react-icons/ai';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import cn from 'classnames';
import styles from './ScheduleDetailSelect.module.scss';
import { TourismPeriodResponse } from '@/shared/interfaces/schedule.interface';
import { motion } from 'framer-motion';
import {
	toggleVariant,
	toggleWrapperVariant,
} from '@/utils/animation/toggle-variant';

const ScheduleDetailSelect: FC<{
	schedulePeriods: TourismPeriodResponse[];
	onSelectedPeriod: (period: string) => void;
	isSelectedPeriod: string;
}> = ({ schedulePeriods, onSelectedPeriod, isSelectedPeriod }) => {
	const [isSelectToggle, setIsSelectToggle] = useState<boolean>(false);

	const handleSelectToggle = () => {
		setIsSelectToggle(!isSelectToggle);
	};

	const handleSelectedPeriod = (period: string) => {
		onSelectedPeriod(period);
		setIsSelectToggle(!isSelectToggle);
	};

	return (
		<motion.div
			className={styles.select_container}
			initial={false}
			animate={isSelectToggle ? 'open' : 'closed'}
		>
			<motion.div
				className={styles.toggle_container}
				whileTap={{ scale: 0.97 }}
				onClick={handleSelectToggle}
			>
				<div>
					<AiOutlineSchedule size={22} />
				</div>
				<div className={styles.option_text}>
					{isSelectedPeriod === 'ALL'
						? `전체일정`
						: `${
								schedulePeriods.findIndex(
									item => item.period === isSelectedPeriod,
								) + 1
						  }일차 ${isSelectedPeriod}`}
				</div>
				<div>
					{isSelectToggle ? (
						<MdKeyboardArrowDown size={22} />
					) : (
						<MdKeyboardArrowUp size={22} />
					)}
				</div>
			</motion.div>

			<motion.div
				className={styles.select_layer_modal_container}
				variants={toggleWrapperVariant}
				style={{ pointerEvents: isSelectToggle ? 'auto' : 'none' }}
			>
				<motion.div
					className={styles.modal_title_container}
					variants={toggleVariant}
				>
					<div>
						<AiOutlineEye size={22} />
					</div>
					<div className={styles.modal_title}>여행 일정별 계획</div>
				</motion.div>

				<motion.div
					className={cn(styles.select_item, {
						[styles.active]: isSelectedPeriod === 'ALL',
					})}
					variants={toggleVariant}
					onClick={() => handleSelectedPeriod('ALL')}
				>
					{`전체일정`}
					{isSelectedPeriod === 'ALL' && (
						<div className={styles.icon_container}>
							<AiOutlineCheck size={14} color="#e5855d" />
						</div>
					)}
				</motion.div>
				{schedulePeriods.map((period, index) => (
					<motion.div
						key={index}
						className={cn(styles.select_item, {
							[styles.active]: isSelectedPeriod === period.period,
						})}
						variants={toggleVariant}
						onClick={() => handleSelectedPeriod(period.period)}
					>
						{`${index + 1}일차 ${period.period}`}
						{isSelectedPeriod === period.period && (
							<div className={styles.icon_container}>
								<AiOutlineCheck size={14} color="#e5855d" />
							</div>
						)}
					</motion.div>
				))}
			</motion.div>
		</motion.div>
	);
};

export default ScheduleDetailSelect;
