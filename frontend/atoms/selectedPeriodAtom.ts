import { atom } from 'recoil';

export const selectedPeriodAtom = atom<string>({
	default: '',
	key: 'selectedPeriodAtom',
});
