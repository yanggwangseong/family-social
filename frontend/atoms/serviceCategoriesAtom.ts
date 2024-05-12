import { atom } from 'recoil';

export const serviceCategoriesDefaultValue = {
	firstCategory: '',
	firstCategoryName: '',
	secondCategory: '',
	secondCategoryName: '',
	thirdCategory: '',
	thirdCategoryName: '',
};

export interface serviceCategoriesAtomType {
	firstCategory: string;
	firstCategoryName: string;
	secondCategory: string;
	secondCategoryName: string;
	thirdCategory: string;
	thirdCategoryName: string;
}

export const serviceCategoriesAtom = atom<serviceCategoriesAtomType>({
	default: serviceCategoriesDefaultValue,
	key: 'serviceCategories',
});
