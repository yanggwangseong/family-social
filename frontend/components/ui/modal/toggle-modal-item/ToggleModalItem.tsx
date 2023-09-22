import React, { FC } from 'react';
import styles from './ToggleModalItem.module.scss';
import { ToggleModalItemProps } from './toggle-modal-item.interface';

const ToggleModalItem: FC<ToggleModalItemProps> = ({
	Icon,
	title,
	description,
}) => {
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
