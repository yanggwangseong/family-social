import { atom } from 'recoil';

export const scheduleIdAtom = atom<string>({
	default: '',
	key: 'scheduleIdAtom',
});
