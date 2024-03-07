import { atom } from 'recoil';

export const createMessageModalAtom = atom<boolean>({
	default: false,
	key: 'createMessageModalAtom',
});
