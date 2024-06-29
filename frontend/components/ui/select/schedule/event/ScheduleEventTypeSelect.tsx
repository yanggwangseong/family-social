import React, { FC, useReducer } from 'react';
import styles from './ScheduleEventType.module.scss';
import { ScheduleEventTypeProps } from './schedule-event-type.interface';
import { motion } from 'framer-motion';
import { AiOutlineCheck, AiOutlineEye } from 'react-icons/ai';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import {
	toggleVariant,
	toggleWrapperVariant,
} from '@/utils/animation/toggle-variant';
import cn from 'classnames';
import { PiLightningDuotone } from 'react-icons/pi';

const ScheduleEventTypeSelect: FC<ScheduleEventTypeProps> = ({
	options,
	onChangeEventType,
}) => {
	const [isSelectToggle, setIsSelectToggle] = useReducer(state => {
		return !state;
	}, false);

	return (
		<motion.div
			className={styles.select_container}
			initial={false}
			animate={isSelectToggle ? 'open' : 'closed'}
		>
			<motion.div
				className={styles.toggle_container}
				onClick={setIsSelectToggle}
				whileTap={{ scale: 0.97 }}
			>
				<div>
					<AiOutlineEye size={22} />
				</div>
				<div className={styles.option_text}>
					{options === 'BIRTHDAY' && '생일'}
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
						<PiLightningDuotone size={22} />
					</div>
					<div className={styles.modal_title}>이벤트 타입 설정</div>
				</motion.div>
				<motion.div
					className={cn(styles.select_item, {
						[styles.active]: options === 'BIRTHDAY',
					})}
					variants={toggleVariant}
					onClick={() => onChangeEventType('BIRTHDAY')}
				>
					생일
					{options === 'BIRTHDAY' && (
						<div className={styles.icon_container}>
							<AiOutlineCheck size={14} color="#e5855d" />
						</div>
					)}
				</motion.div>
			</motion.div>
		</motion.div>
	);
};

export default ScheduleEventTypeSelect;
