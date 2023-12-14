import { atom } from 'recoil';

export interface serviceCategoriesAtomType {
	firstCategory: string;
	firstCategoryName: string;
	secondCategory: string;
	secondCategoryName: string;
	thirdCategory: string;
	thirdCategoryName: string;
}

export const serviceCategoriesAtom = atom<serviceCategoriesAtomType>({
	default: {
		firstCategory: '',
		firstCategoryName: '',
		secondCategory: '',
		secondCategoryName: '',
		thirdCategory: '',
		thirdCategoryName: '',
	},
	key: 'serviceCategories',
});
