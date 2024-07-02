import { atom } from 'recoil';

export interface commentAtomType {
	commentId: string;
	feedId: string;
}

export const CommentAtomDefaultValue = {
	commentId: '',
	feedId: '',
};
export const commentAtom = atom<commentAtomType>({
	default: CommentAtomDefaultValue,
	key: 'comment',
});
