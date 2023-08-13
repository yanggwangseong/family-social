import { atom } from 'recoil';

export const todoAtom = atom<string>({
	default: 'empty',
	key: 'todo',
});
