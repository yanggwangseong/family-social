import { useState } from 'react';
import createFeedAnimation from '@/assets/lottie/createFeed.json';
import { useRecoilState } from 'recoil';
import { modalAtom, modalLayerAtom } from '@/atoms/modalAtom';
import { successLayerModalAtom } from '@/atoms/successLayerModalAtom';
import { LayerMode, Union } from 'types';

export const successLottie = {
	createFeedAnimation: createFeedAnimation,
} as const;

export const useSuccessLayerModal = () => {
	const [, setIsShowing] = useRecoilState<boolean>(modalAtom);
	const [, setIsLayer] = useRecoilState(modalLayerAtom);

	const [isSuccessModal, setIsSuccessModal] = useRecoilState(
		successLayerModalAtom,
	);

	const handleCloseLayerModal = () => {
		setIsShowing(false);
	};

	const handleChangeLayer = (
		modalTitle: string,
		layer: Union<typeof LayerMode>,
	) => {
		setIsLayer({
			modal_title: modalTitle,
			layer,
		});
	};

	const handleChangeSuccessModal = (
		lottieFile: keyof typeof successLottie,
		message: string,
	) => {
		setIsSuccessModal({
			lottieFile,
			message,
		});
	};

	return {
		handleCloseLayerModal,
		lottie: successLottie[isSuccessModal.lottieFile],
		setIsSuccessModal,
		handleChangeLayer,
		handleChangeSuccessModal,
		isSuccessModal,
	};
};
