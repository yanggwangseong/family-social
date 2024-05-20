import { atom } from 'recoil';

export const sharedFamIdsAtom = atom<string[]>({
	default: [],
	key: 'sahredFamIds',
});
