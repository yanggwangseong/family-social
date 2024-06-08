import React, { FC } from 'react';
import LayerModalVariantWrapper from '../LayerModalVariantWrapper';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import Lottie from 'lottie-react';
import createFeedAnimation from '@/assets/lottie/createFeed.json';
import { useRecoilState, useRecoilValue } from 'recoil';
import { successLayerModalAtom } from '@/atoms/successLayerModalAtom';
import { modalAtom } from '@/atoms/modalAtom';
import styles from './SuccessLayerModal.module.scss';

const SuccessLayerModal: FC = () => {
	const isSuccessModal = useRecoilValue(successLayerModalAtom);

	const [, setIsShowing] = useRecoilState<boolean>(modalAtom);

	return (
		<LayerModalVariantWrapper>
			<div>
				<Lottie
					style={{ height: '380px' }}
					animationData={createFeedAnimation}
				/>
			</div>
			<div className={styles.btn_container}>
				<CustomButton
					type="button"
					className="mt-8 mb-4 bg-customOrange text-customDark 
					font-bold border border-solid border-customDark 
					rounded-full p-[10px] w-full hover:opacity-80"
					onClick={() => setIsShowing(false)}
				>
					{isSuccessModal.message}
				</CustomButton>
			</div>
		</LayerModalVariantWrapper>
	);
};

export default SuccessLayerModal;
