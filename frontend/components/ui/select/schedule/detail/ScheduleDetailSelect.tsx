import React, { FC, useState } from 'react';
import {
	AiOutlineCheck,
	AiOutlineEye,
	AiOutlineSchedule,
} from 'react-icons/ai';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import cn from 'classnames';
import styles from './ScheduleDetailSelect.module.scss';

const ScheduleDetailSelect: FC = () => {
	const [isSelectToggle, setIsSelectToggle] = useState<boolean>(false);

	const handleSelectToggle = () => {
		setIsSelectToggle(!isSelectToggle);
	};

	return (
		<div className={styles.select_container}>
			<div className={styles.toggle_container} onClick={handleSelectToggle}>
				<div>
					<AiOutlineSchedule size={22} />
				</div>
				<div className={styles.option_text}>{`1일차`}</div>
				<div>
					<MdKeyboardArrowDown size={22} />
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
					<div>
						<div className={styles.select_item}>
							{`1일차`}

							<div className={styles.icon_container}>
								<AiOutlineCheck size={14} color="#e5855d" />
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ScheduleDetailSelect;
