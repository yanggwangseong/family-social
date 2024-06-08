import React, { FC } from 'react';
import LayerModalVariantWrapper from '../LayerModalVariantWrapper';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import Lottie from 'lottie-react';
import styles from './SuccessLayerModal.module.scss';
import { useSuccessLayerModal } from '@/hooks/useSuccessLayerModal';

const SuccessLayerModal: FC = () => {
	const { handleCloseLayerModal, isSuccessModal, lottie } =
		useSuccessLayerModal();

	return (
		<LayerModalVariantWrapper>
			<div>
				<Lottie style={{ height: '380px' }} animationData={lottie} />
			</div>
			<div className={styles.btn_container}>
				<CustomButton
					type="button"
					className="mt-8 mb-4 bg-customOrange text-customDark 
					font-bold border border-solid border-customDark 
					rounded-full p-[10px] w-full hover:opacity-80"
					onClick={handleCloseLayerModal}
				>
					{isSuccessModal.message}
				</CustomButton>
			</div>
		</LayerModalVariantWrapper>
	);
};

export default SuccessLayerModal;
