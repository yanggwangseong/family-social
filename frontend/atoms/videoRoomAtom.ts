import { atom } from 'recoil';

export const videoRoomAtom = atom<string>({
	default: '',
	key: 'videoRoomAtom',
});
