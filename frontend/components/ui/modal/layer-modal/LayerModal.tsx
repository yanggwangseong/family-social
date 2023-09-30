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
					<div className="w-[500px] h-[500px] bg-white border border-solid border-customDark p-6">
						<div className="flex">
							<div>modal_title</div>
							<div
								className="ml-auto font-bold text-lg cursor-pointer"
								onClick={() => setIsShowing(false)}
							>
								x
							</div>
						</div>
						<LayerModalControll status={isLayer}></LayerModalControll>
					</div>
				</div>
			)}
		</>
	);
};

export default LayerModal;
