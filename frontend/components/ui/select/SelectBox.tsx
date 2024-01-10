import React, { FC, useState } from 'react';
import styles from './SelectBox.module.scss';
import { AiOutlineCheck, AiOutlineEye } from 'react-icons/ai';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import cn from 'classnames';
import { SelectOptions, Union } from 'types';

const SelectBox: FC = () => {
	const [isToggle, setIsToggle] = useState<boolean>(false);

	const handleSelectToggle = () => {
		setIsToggle(!isToggle);
	};

	return (
		<div className={styles.public_select_container}>
			<div className={styles.toggle_container} onClick={handleSelectToggle}>
				<div>
					<AiOutlineEye size={22} />
				</div>
				<div className={styles.option_text}>
					{isPublic === 'public' ? '공개' : '비공개'}
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
						<div className={styles.modal_title}>피드를 공개/비공개 설정</div>
					</div>
					<div
						className={cn(styles.select_item, {
							[styles.active]: isPublic === 'public',
						})}
						onClick={() => handleChageIsPublic('public')}
					>
						공개
						{isPublic === 'public' && (
							<div className={styles.icon_container}>
								<AiOutlineCheck size={14} color="#e5855d" />
							</div>
						)}
					</div>
					<div
						className={cn(styles.select_item, {
							[styles.active]: isPublic === 'private',
						})}
						onClick={() => handleChageIsPublic('private')}
					>
						비공개
						{isPublic === 'private' && (
							<div className={styles.icon_container}>
								<AiOutlineCheck size={14} color="#e5855d" />
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default SelectBox;
