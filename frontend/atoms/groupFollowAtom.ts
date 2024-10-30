import { atom } from 'recoil';

export interface GroupFollowAtomType {
	groupId: string;
}

export const groupFollowAtomDefaultValue: GroupFollowAtomType = {
	groupId: '',
};

export const groupFollowAtom = atom<GroupFollowAtomType>({
	key: 'groupFollowAtom',
	default: groupFollowAtomDefaultValue,
});
