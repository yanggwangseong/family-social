import React, { FC } from 'react';
import LayerModalVariantWrapper from '../LayerModalVariantWrapper';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import Lottie from 'lottie-react';
import newFeedAnimation from '@/assets/lottie/newFeed.json';

const SuccessLayerModal: FC = () => {
	return (
		<LayerModalVariantWrapper>
			<div className="my-10">
				<Lottie animationData={newFeedAnimation} />
			</div>
			<div className="flex w-full">
				<CustomButton
					type="button"
					className="mt-8 mb-4 bg-customDark text-customOrange 
            font-bold border border-solid border-customDark 
            rounded-full p-[10px] w-full hover:opacity-80"
				>
					확인
				</CustomButton>
			</div>
		</LayerModalVariantWrapper>
	);
};

export default SuccessLayerModal;
