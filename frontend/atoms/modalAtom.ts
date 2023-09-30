import { atom } from 'recoil';
import { LayerMode, Union } from 'types';

export const modalAtom = atom({
	default: false,
	key: 'modalState',
});

export const modalLayerAtom = atom<Union<typeof LayerMode>>({
	default: 'progress',
	key: 'modalLayer',
});
