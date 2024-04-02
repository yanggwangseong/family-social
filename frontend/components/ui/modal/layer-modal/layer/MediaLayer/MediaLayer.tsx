import React, { FC } from 'react';
import styles from './MediaLayer.module.scss';
import {
	mediasLayerModalAtom,
	mediasLayerModalAtomType,
} from '@/atoms/mediasLayerModalAtom';
import { useRecoilState } from 'recoil';

import SwiperContainer from '@/components/ui/swiper/SwiperContainer';

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
			{layer.isShowing && (
				<div className={styles.modal_mask}>
					<div className={styles.modal_close_wrap} onClick={handleCloseModal}>
						x
					</div>
					<div className={styles.modal_container}>
						<SwiperContainer type="feed-item" list={layer.medias} />
					</div>
				</div>
			)}
		</>
	);
};

export default MediaLayer;
