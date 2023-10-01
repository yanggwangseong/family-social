import { modalAtom, modalLayerAtom } from '@/atoms/modalAtom';
import React, { FC } from 'react';
import { useRecoilState } from 'recoil';
import styles from './LayerModal.module.scss';
import LayerModalControll from './LayerModalControll';

const LayerModal: FC = () => {
	const [isShowing, setIsShowing] = useRecoilState<boolean>(modalAtom);
	const [isLayer, setIsLayer] = useRecoilState(modalLayerAtom);

	return (
		<>
			{isShowing && (
				<div className={styles.modal_mask}>
					<div className={styles.modal_container}>
						<div className={styles.modal_top_container}>
							<div className={styles.modal_title_wrap}>
								{isLayer.modal_title}
							</div>
							<div
								className={styles.modal_close_wrap}
								onClick={() => setIsShowing(false)}
							>
								x
							</div>
						</div>
						<LayerModalControll status={isLayer.layer}></LayerModalControll>
					</div>
				</div>
			)}
		</>
	);
};

export default LayerModal;
