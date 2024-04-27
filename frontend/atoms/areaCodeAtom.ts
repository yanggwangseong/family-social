import { atom } from 'recoil';

export const areaCodeDefaultValue = {
	areaCodeMain: '',
	areaCodeMainName: '',
	areaCodeSub: '',
	areaCodeSubName: '',
};
export interface areaCodeAtomType {
	areaCodeMain: string;
	areaCodeMainName: string;
	areaCodeSub: string;
	areaCodeSubName: string;
}

export const areaCodeAtom = atom<areaCodeAtomType>({
	default: areaCodeDefaultValue,
	key: 'areaCode',
});
