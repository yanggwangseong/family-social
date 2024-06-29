import { useState } from 'react';
import createFeedAnimation from '@/assets/lottie/createFeed.json';
import createCommentAnimation from '@/assets/lottie/createComment.json';
import createScheduleAnimation from '@/assets/lottie/createSchedule.json';
import createEventAnimation from '@/assets/lottie/eventAnimation.json';
import { useRecoilState } from 'recoil';
import { modalAtom, modalLayerAtom } from '@/atoms/modalAtom';
import { successLayerModalAtom } from '@/atoms/successLayerModalAtom';
import { LayerMode, Union } from 'types';
import { useRouter } from 'next/router';

export const successLottie = {
	createFeedAnimation: createFeedAnimation,
	createCommentAnimation: createCommentAnimation,
	createScheduleAnimation: createScheduleAnimation,
	createEventAnimation: createEventAnimation,
} as const;

export const useSuccessLayerModal = () => {
	const router = useRouter();

	const [isShowing, setIsShowing] = useRecoilState<boolean>(modalAtom);
	const [, setIsLayer] = useRecoilState(modalLayerAtom);

	const [isSuccessModal, setIsSuccessModal] = useRecoilState(
		successLayerModalAtom,
	);

	const handleCloseLayerModal = () => {
		setIsShowing(false);

		if (isSuccessModal.lottieFile === 'createScheduleAnimation')
			router.push(`/schedules`);
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
