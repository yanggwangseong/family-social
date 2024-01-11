import React, { FC, useState } from 'react';
import styles from './SelectBox.module.scss';
import { AiOutlineCheck, AiOutlineEye } from 'react-icons/ai';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import cn from 'classnames';
import { Union } from 'types';
import { useSelect } from '@/hooks/useSelect';
import { orderSelectOptionsKeys } from '@/components/screens/schedule/create/tourism/tourism.interface';
import { orderSelectOptions } from '@/components/screens/schedule/create/tourism/tourism.constants';

const SelectBox: FC<{
	options: readonly orderSelectOptionsKeys[];
	onChangeSelected: (status: orderSelectOptionsKeys) => void;
	onSelectToggle: () => void;
	isToggle: boolean;
	isSelected: orderSelectOptionsKeys;
	comment: string;
}> = ({
	options,
	onSelectToggle,
	onChangeSelected,
	isToggle,
	isSelected,
	comment,
}) => {
	const handleSelectToggle = () => {
		onSelectToggle();
	};

	const handleChangeSelected = (status: orderSelectOptionsKeys) => {
		onChangeSelected(status);
	};
	return (
		<div className={styles.public_select_container}>
			<div className={styles.toggle_container} onClick={handleSelectToggle}>
				<div>
					<AiOutlineEye size={22} />
				</div>
				<div className={styles.option_text}>
					{orderSelectOptions[isSelected]}
				</div>
				<div>
					{isToggle ? (
						<MdKeyboardArrowDown size={22} />
					) : (
						<MdKeyboardArrowUp size={22} />
					)}
				</div>
			</div>
			{isToggle && (
				<div className={styles.select_layer_modal_container}>
					<div className={styles.modal_title_container}>
						<div>
							<AiOutlineEye size={22} />
						</div>
						<div className={styles.modal_title}>{comment}</div>
					</div>
					{options.map((option, index) => (
						<div
							key={index}
							className={cn(styles.select_item, {
								[styles.active]: isSelected === option,
							})}
							onClick={() => handleChangeSelected(option)}
						>
							{orderSelectOptions[option]}
							{isSelected === option && (
								<div className={styles.icon_container}>
									<AiOutlineCheck size={14} color="#e5855d" />
								</div>
							)}
						</div>
					))}

					{/* <div
						className={cn(styles.select_item, {
							[styles.active]: isSelected === 'orderSubject',
						})}
						onClick={() => handleChageSelected('orderSubject')}
					>
						{orderSelectOptions['orderSubject']}
						{isSelected === 'orderSubject' && (
							<div className={styles.icon_container}>
								<AiOutlineCheck size={14} color="#e5855d" />
							</div>
						)}
					</div>
					<div
						className={cn(styles.select_item, {
							[styles.active]: isSelected === 'orderUpdated',
						})}
						onClick={() => handleChageSelected('orderUpdated')}
					>
						{orderSelectOptions['orderUpdated']}
						{isSelected === 'orderUpdated' && (
							<div className={styles.icon_container}>
								<AiOutlineCheck size={14} color="#e5855d" />
							</div>
						)}
					</div> */}
				</div>
			)}
		</div>
	);
};

export default SelectBox;
