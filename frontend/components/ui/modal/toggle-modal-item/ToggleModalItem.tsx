import React, { FC, useState } from 'react';
import styles from './ToggleModalItem.module.scss';
import { ToggleMenu } from '../toggle-modal.interface';
import { useRecoilState } from 'recoil';
import { modalAtom, modalLayerAtom } from '@/atoms/modalAtom';
import { feedIdAtom } from '@/atoms/feedIdAtom';
import { motion } from 'framer-motion';
import { toggleVariant } from '@/utils/animation/toggle-variant';

const ToggleModalItem: FC<ToggleMenu> = ({
	Icon,
	title,
	description,
	layer,
	onClose,
	feedId,
}) => {
	const [isShowing, setIsShowing] = useRecoilState(modalAtom);
	const [, setIsLayer] = useRecoilState(modalLayerAtom);

	const [, setIsFeedId] = useRecoilState(feedIdAtom);

	return (
		<motion.div
			className={styles.toggle_modal_item_container}
			onClick={() => {
				if (onClose) {
					setIsShowing(!isShowing); // layer modal 보여주기
					setIsLayer({
						modal_title: title,
						layer: layer,
					}); // layer modal 어떤 layer를 보여 줄건지
					feedId && setIsFeedId(feedId);
					onClose(); //toggle modal 닫기
				}
			}}
			variants={toggleVariant}
		>
			<div className={styles.icon_container}>
				<Icon size={22} />
			</div>
			<div className={styles.menu_text_container}>
				<div>{title}</div>
				<div className={styles.menu_description}>{description}</div>
			</div>
		</motion.div>
	);
};

export default ToggleModalItem;
