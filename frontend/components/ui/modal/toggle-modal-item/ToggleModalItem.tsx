import React, { FC } from 'react';
import styles from './ToggleModalItem.module.scss';
import { ToggleMenu } from '../toggle-modal.interface';

const ToggleModalItem: FC<ToggleMenu> = ({ Icon, title, description }) => {
	return (
		<div className={styles.toggle_modal_item_container}>
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
