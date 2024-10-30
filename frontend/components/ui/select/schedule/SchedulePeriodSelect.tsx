import React, { FC, useState } from 'react';
import {
	AiOutlineCheck,
	AiOutlineEye,
	AiOutlineSchedule,
} from 'react-icons/ai';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import styles from './SchedulePeriodSelect.module.scss';
import { useRecoilState } from 'recoil';
import { periodAtom } from '@/atoms/periodAtom';
import cn from 'classnames';
import { selectedPeriodAtom } from '@/atoms/selectedPeriodAtom';
import { motion } from 'framer-motion';
import {
	toggleVariant,
	toggleWrapperVariant,
} from '@/utils/animation/toggle-variant';

const SchedulePeriodSelect: FC = () => {
	const [isPeriods] = useRecoilState(periodAtom);

	const [isSelectToggle, setIsSelectToggle] = useState<boolean>(false);

	const [isSelectedPeriod, setIsSelectedPeriod] =
		useRecoilState(selectedPeriodAtom);

	const handleSelectToggle = () => {
		setIsSelectToggle(!isSelectToggle);
	};

	const handleSelectedPeriod = (period: string) => {
		setIsSelectedPeriod(period);
		setIsSelectToggle(!isSelectToggle);
	};

	return (
		<motion.div
			className={styles.public_select_container}
			initial={false}
			animate={isSelectToggle ? 'open' : 'closed'}
		>
			<motion.div
				className={styles.toggle_container}
				onClick={handleSelectToggle}
				whileTap={{ scale: 0.97 }}
			>
				<div>
					<AiOutlineSchedule size={22} />
				</div>
				<div className={styles.option_text}>{`${
					isPeriods.findIndex(item => item.period === isSelectedPeriod) + 1
				}일차 ${isSelectedPeriod}`}</div>
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
					<div className={styles.modal_title}>
						여행 일자별 관광 순서 및 시간 설정
					</div>
				</motion.div>
				{isPeriods.map((period, index) => (
					<motion.div
						key={index}
						variants={toggleVariant}
						className={cn(styles.select_item, {
							[styles.active]: isSelectedPeriod === period.period,
						})}
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

export default SchedulePeriodSelect;
