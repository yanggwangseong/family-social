import React, { FC, useEffect, useRef } from 'react';
import styles from './ToggleModal.module.scss';
import ToggleModalItem from './toggle-modal-item/ToggleModalItem';
import { ToggleModalProps } from './toggle-modal.interface';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { toggleWrapperVariant } from '@/utils/animation/toggle-variant';

const ToggleModal: FC<ToggleModalProps> = ({
	list,
	onClose,
	direction = 'left',
	feedId,
	groupId,
}) => {
	return (
		<motion.div
			className={cn({
				[styles.toggle_modal_container]: direction && direction === 'left',
				[styles.toggle_modal_right_container]:
					direction && direction === 'right',
			})}
			variants={toggleWrapperVariant}
		>
			{/* menu */}
			{list.map((item, index) => (
				<ToggleModalItem
					key={index}
					Icon={item.Icon}
					title={item.title}
					description={item.description}
					layer={item.layer}
					onClose={onClose}
					feedId={feedId}
					groupId={groupId}
				/>
			))}
		</motion.div>
	);
};

export default ToggleModal;
