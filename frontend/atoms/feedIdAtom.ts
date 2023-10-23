import { atom } from 'recoil';

export const feedIdAtom = atom<string>({
	default: '',
	key: 'feedId',
});
