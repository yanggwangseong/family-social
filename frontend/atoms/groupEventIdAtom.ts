import { atom } from 'recoil';

export interface groupEventIdAtomType {
	groupId: string;
	groupEventId: string;
}

export const groupEventIdAtomDefaultValue = {
	groupId: '',
	groupEventId: '',
};
export const groupEventIdAtom = atom<groupEventIdAtomType>({
	default: groupEventIdAtomDefaultValue,
	key: 'groupEventIdAtom',
});
