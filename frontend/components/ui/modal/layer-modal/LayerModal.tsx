import { modalAtom, modalLayerAtom } from '@/atoms/modalAtom';
import React, { FC } from 'react';
import { useRecoilState } from 'recoil';
import styles from './LayerModal.module.scss';
import LayerModalControll from './LayerModalControll';
import { motion } from 'framer-motion';
import { toggleWrapperVariant } from '@/utils/animation/toggle-variant';
import cn from 'classnames';

const LayerModal: FC = () => {
	const [isShowing, setIsShowing] = useRecoilState<boolean>(modalAtom);
	const [isLayer, setIsLayer] = useRecoilState(modalLayerAtom);

	return (
		<>
			<motion.div
				className={cn(styles.container, {
					[styles.modal_mask]: !!isShowing,
				})}
				initial={false}
				animate={isShowing ? 'open' : 'closed'}
			>
				<motion.div
					className={styles.modal_container}
					variants={toggleWrapperVariant}
				>
					<div className={styles.modal_top_container}>
						<div className={styles.modal_title_wrap}>{isLayer.modal_title}</div>
						<div
							className={styles.modal_close_wrap}
							onClick={() => setIsShowing(false)}
						>
							x
						</div>
					</div>
					<LayerModalControll status={isLayer.layer}></LayerModalControll>
				</motion.div>
			</motion.div>
		</>
	);
};

export default LayerModal;
