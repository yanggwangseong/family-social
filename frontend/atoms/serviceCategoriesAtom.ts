import { atom } from 'recoil';

export interface serviceCategoriesAtomType {
	firstCategory: string;
	secondCategory: string;
	thirdCategory: string;
}

export const serviceCategoriesAtom = atom<serviceCategoriesAtomType>({
	default: {
		firstCategory: '',
		secondCategory: '',
		thirdCategory: '',
	},
	key: 'serviceCategories',
});
