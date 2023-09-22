import React, { FC } from 'react';
import styles from './ToggleModal.module.scss';
import ToggleModalItem from './toggle-modal-item/ToggleModalItem';
import { ToggleModalProps } from './toggle-modal.interface';

const ToggleModal: FC<ToggleModalProps> = ({ list }) => {
	return (
		<div className={styles.toggle_modal_container}>
			{/* menu */}
			{list.map(item => (
				<ToggleModalItem
					Icon={item.Icon}
					title={item.title}
					description={item.description}
				/>
			))}
		</div>
	);
};

export default ToggleModal;
