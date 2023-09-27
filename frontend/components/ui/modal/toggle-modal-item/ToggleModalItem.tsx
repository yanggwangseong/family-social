import React, { FC } from 'react';
import styles from './ToggleModalItem.module.scss';
import { ToggleMenu } from '../toggle-modal.interface';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@/atoms/modalAtom';

const ToggleModalItem: FC<ToggleMenu> = ({
	Icon,
	title,
	description,
	onClose,
}) => {
	const [isShowing, setIsShowing] = useRecoilState(modalAtom);
	return (
		<div
			className={styles.toggle_modal_item_container}
			onClick={() => {
				if (onClose) {
					setIsShowing(!isShowing);
					onClose();
				}
			}}
		>
			<div className={styles.icon_container}>
				<Icon size={22} />
			</div>
			<div className={styles.menu_text_container}>
				<div>{title}</div>
				<div className={styles.menu_description}>{description}</div>
			</div>
		</div>
	);
};

export default ToggleModalItem;
