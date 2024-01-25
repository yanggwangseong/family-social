import { atom } from 'recoil';

export interface tourDetailAtomType {
	contentId: string;
	contentTypeId: string;
}

export const tourDetailAtom = atom<tourDetailAtomType>({
	default: {
		contentId: '',
		contentTypeId: '',
	},
	key: 'tourDetail',
});
