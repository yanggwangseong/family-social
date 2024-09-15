import { orderSelectOptionsKeys } from '@/components/screens/schedule/create/tourism/tourism.interface';

export interface SearchTourListArgs {
	keyword: string;
	isSelected: orderSelectOptionsKeys;
	numOfRows: number;
	pageNo: number;
	contentTypeId: string;
}

export interface ServiceCategoriesArgs {
	firstCategory?: string;
	secondCategory?: string;
	thirdCategory?: string;
	contentTypeId?: string;
}

export interface TourListsArgs {
	numOfRows: number;
	pageNo: number;
	contentTypeId: string;
	areaCode: string;
	sigunguCode: string;
	cat1: string;
	cat2: string;
	cat3: string;
	isSelected: orderSelectOptionsKeys;
}

export interface SearchTourFestivalListArgs {
	numOfRows: number;
	pageNo: number;
	areaCode: string;
	sigunguCode: string;
	isSelected: orderSelectOptionsKeys;
	eventStartDate: string;
}

export interface IntroductionByContentTypeIdArgs {
	contentId: string;
	numOfRows: string;
	pageNo: string;
	contentTypeId: string;
}

export interface AdditionalExplanationArgs
	extends IntroductionByContentTypeIdArgs {}
