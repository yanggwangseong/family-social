import { useState } from 'react';
import createFeedAnimation from '@/assets/lottie/createFeed.json';
import createCommentAnimation from '@/assets/lottie/createComment.json';
import createScheduleAnimation from '@/assets/lottie/createSchedule.json';
import createEventAnimation from '@/assets/lottie/eventAnimation.json';
import deleteAnimation from '@/assets/lottie/deleteAnimation.json';
import inviteCodeAnimation from '@/assets/lottie/createFam.json';
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
	deleteAnimation: deleteAnimation,
	inviteCodeAnimation: inviteCodeAnimation,
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
	};

	const handleSuccessLayerModal = ({
		modalTitle,
		layer,
		lottieFile,
		message,
		onConfirm, // onConfirm 콜백 추가
	}: {
		modalTitle: string;
		layer: Union<typeof LayerMode>;
		lottieFile: keyof typeof successLottie;
		message: string;
		onConfirm?: () => void; // 선택적으로 전달될 수 있는 콜백
	}) => {
		setIsLayer({
			modal_title: modalTitle,
			layer,
		});

		setIsSuccessModal({
			lottieFile,
			message,
			onConfirm, // onConfirm 저장
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
