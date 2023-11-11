import { atom } from 'recoil';

export interface commentAtomType {
	commentId: string;
	feedId: string;
}
export const commentAtom = atom<commentAtomType>({
	default: {
		commentId: '',
		feedId: '',
	},
	key: 'comment',
});
