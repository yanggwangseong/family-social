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

const SchedulePeriodSelect: FC = () => {
	const [isPeriods] = useRecoilState(periodAtom);

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
				<div className={styles.option_text}>{'1일차 2023-12-23'}</div>
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
						<div key={index} className={styles.select_item}>
							{`${index + 1}일차 ${period}`}
						</div>
					))}
					{/* <div className={styles.select_item}>
						1일차 2023-12-23
						<div className={styles.icon_container}>
							<AiOutlineCheck size={14} color="#e5855d" />
						</div>
					</div>
					<div className={styles.select_item}>
						2일차 2023-12-24
						
					</div>
					<div className={styles.select_item}>
						3일차 2023-12-25
						
					</div> */}
				</div>
			)}
		</div>
	);
};

export default SchedulePeriodSelect;
