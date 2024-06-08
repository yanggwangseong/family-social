import { useState } from 'react';
import createFeedAnimation from '@/assets/lottie/createFeed.json';
import createCommentAnimation from '@/assets/lottie/createComment.json';
import { useRecoilState } from 'recoil';
import { modalAtom, modalLayerAtom } from '@/atoms/modalAtom';
import { successLayerModalAtom } from '@/atoms/successLayerModalAtom';
import { LayerMode, Union } from 'types';

export const successLottie = {
	createFeedAnimation: createFeedAnimation,
	createCommentAnimation: createCommentAnimation,
} as const;

export const useSuccessLayerModal = () => {
	const [isShowing, setIsShowing] = useRecoilState<boolean>(modalAtom);
	const [, setIsLayer] = useRecoilState(modalLayerAtom);

	const [isSuccessModal, setIsSuccessModal] = useRecoilState(
		successLayerModalAtom,
	);

	const handleCloseLayerModal = () => {
		setIsShowing(false);
	};

	const handleSuccessLayerModal = ({
		modalTitle,
		layer,
		lottieFile,
		message,
	}: {
		modalTitle: string;
		layer: Union<typeof LayerMode>;
		lottieFile: keyof typeof successLottie;
		message: string;
	}) => {
		setIsLayer({
			modal_title: modalTitle,
			layer,
		});

		setIsSuccessModal({
			lottieFile,
			message,
		});

		!isShowing && setIsShowing(true);
	};

	return {
		handleCloseLayerModal,
		lottie: successLottie[isSuccessModal.lottieFile],
		setIsSuccessModal,
		handleSuccessLayerModal,
		isSuccessModal,
	};
};
