import React, { FC } from 'react';
import styles from './MediaLayer.module.scss';
import {
	mediasLayerModalAtom,
	mediasLayerModalAtomType,
} from '@/atoms/mediasLayerModalAtom';
import { useRecoilState } from 'recoil';

import SwiperContainer from '@/components/ui/swiper/SwiperContainer';
import { motion } from 'framer-motion';
import cn from 'classnames';
import {
	toggleVariant,
	toggleWrapperVariant,
} from '@/utils/animation/toggle-variant';

const MediaLayer: FC = () => {
	const [layer, setLayer] =
		useRecoilState<mediasLayerModalAtomType>(mediasLayerModalAtom);

	const handleCloseModal = () => {
		setLayer({
			isShowing: false,
			medias: [],
		});
	};

	return (
		<>
			<motion.div
				className={cn(styles.container, {
					[styles.modal_mask]: !!layer.isShowing,
				})}
				initial={false}
				animate={layer.isShowing ? 'open' : 'closed'}
			>
				<div className={styles.modal_close_wrap} onClick={handleCloseModal}>
					x
				</div>
				<motion.div
					className={styles.modal_container}
					variants={toggleWrapperVariant}
				>
					<motion.div
						className={styles.modal_media_layer_container}
						variants={toggleVariant}
					>
						<SwiperContainer type="feed-item" list={layer.medias} />
					</motion.div>
				</motion.div>
			</motion.div>
		</>
	);
};

export default MediaLayer;
