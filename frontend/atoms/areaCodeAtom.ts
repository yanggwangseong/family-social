import { atom } from 'recoil';

export interface areaCodeAtomType {
	areaCodeMain: string;
	areaCodeMainName: string;
	areaCodeSub: string;
	areaCodeSubName: string;
}

export const areaCodeAtom = atom<areaCodeAtomType>({
	default: {
		areaCodeMain: '',
		areaCodeMainName: '',
		areaCodeSub: '',
		areaCodeSubName: '',
	},
	key: 'areaCode',
});
