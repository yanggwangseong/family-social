import { atom } from 'recoil';

export const mainSidebarAtom = atom<boolean>({
	default: false,
	key: 'mainSidebarAtom',
});
