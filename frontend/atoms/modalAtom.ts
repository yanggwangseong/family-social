import { atom } from 'recoil';
import { LayerMode, Union } from 'types';

export interface ModalLayerType {
	layer: Union<typeof LayerMode>;
	modal_title: string;
	modal_description?: string;
}
export const modalAtom = atom({
	default: false,
	key: 'modalState',
});

export const modalLayerAtom = atom<ModalLayerType>({
	default: {
		layer: 'progress',
		modal_title: '',
		modal_description: '',
	},
	key: 'modalLayer',
});
