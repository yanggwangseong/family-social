import { atom } from 'recoil';

export const periodAtom = atom<string[]>({
	default: [],
	key: 'periods',
});
