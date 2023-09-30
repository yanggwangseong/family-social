import React, { FC, useEffect, useRef } from 'react';
import styles from './ToggleModal.module.scss';
import ToggleModalItem from './toggle-modal-item/ToggleModalItem';
import { ToggleModalProps } from './toggle-modal.interface';

const ToggleModal: FC<ToggleModalProps> = ({ list, onClose }) => {
	return (
		<div className={styles.toggle_modal_container}>
			{/* menu */}
			{list.map((item, index) => (
				<ToggleModalItem
					key={index}
					Icon={item.Icon}
					title={item.title}
					description={item.description}
					onClose={onClose}
				/>
			))}
		</div>
	);
};

export default ToggleModal;
