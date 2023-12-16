import React, { FC, useState } from 'react';
import { AiOutlineCheck, AiOutlineSchedule } from 'react-icons/ai';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import styles from './SchedulePeriodSelect.module.scss';

const SchedulePeriodSelect: FC = () => {
	const [isSelectToggle, setIsSelectToggle] = useState<boolean>(false);

	const handleSelectToggle = () => {
		setIsSelectToggle(!isSelectToggle);
	};

	return (
		<div className={styles.public_select_container}>
			<div className={styles.toggle_container} onClick={handleSelectToggle}>
				<div>
					<AiOutlineSchedule size={22} />
				</div>
				<div className={styles.option_text}>{'1 일차'}</div>
				<div>
					{isSelectToggle ? (
						<MdKeyboardArrowDown size={22} />
					) : (
						<MdKeyboardArrowUp size={22} />
					)}
				</div>
			</div>
		</div>
	);
};

export default SchedulePeriodSelect;
