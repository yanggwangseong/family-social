import { successLottie } from '@/hooks/useSuccessLayerModal';
import { atom } from 'recoil';

export interface SuccessModalLayerType {
	lottieFile: keyof typeof successLottie;
	message: string;
	onConfirm?: () => void;
}

export const successLayerModalAtom = atom<SuccessModalLayerType>({
	default: {
		lottieFile: 'createFeedAnimation',
		message: '',
	},
	key: 'successLayerModalAtom',
});
