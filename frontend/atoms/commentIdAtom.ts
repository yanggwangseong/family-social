import { atom } from 'recoil';

export const commentIdAtom = atom<string>({
	default: '',
	key: 'commentId',
});
