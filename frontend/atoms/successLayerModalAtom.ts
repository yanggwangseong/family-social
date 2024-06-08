import { atom } from 'recoil';
import { LayerMode, Union } from 'types';

export interface SuccessModalLayerType {
	layer: typeof LayerMode.successLayerModal;
	message: string;
}

export const successLayerModalAtom = atom<SuccessModalLayerType>({
	default: {
		layer: 'successLayerModal',
		message: '',
	},
	key: 'successLayerModalAtom',
});
