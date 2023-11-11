import { MediaInfo } from '@/shared/interfaces/media.interface';
import { atom } from 'recoil';

export interface mediasLayerModalAtomType {
	isShowing: boolean;
	medias: MediaInfo[];
}
export const mediasLayerModalAtom = atom<mediasLayerModalAtomType>({
	default: {
		isShowing: false,
		medias: [],
	},
	key: 'mediasLayerModal',
});
