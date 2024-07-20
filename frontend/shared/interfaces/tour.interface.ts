import { OmitStrict } from 'types';

export interface TourAreaCodeItem {
	code: string;
	name: string;
	rnum: number;
}

// getServiceCategories
export interface TourServiceCategoriesResponse extends TourAreaCodeItem {}

export interface TourResponseItem {
	kind: 'tour';
	addr1: string;
	addr2: string;
	areacode: string;
	cat1: string;
	cat2: string;
	cat3: string;
	contentid: string;
	contenttypeid: string;
	firstimage: string;
	firstimage2: string;
	sigungucode: string;
	tel: string;
	title: string;
	zipcode: string;
	fullAddr: string;
}

export interface TourFestivalItem {
	kind: 'festival';
	addr1: string;
	addr2: string;
	cat1: string;
	cat2: string;
	cat3: string;
	contentid: string;
	contenttypeid: string;
	eventstartdate: string;
	eventenddate: string;
	firstimage: string;
	firstimage2: string;
	areacode: string;
	sigungucode: string;
	tel: string;
	title: string;
}

export interface TourSearchItem
	extends OmitStrict<
		TourFestivalItem,
		'eventenddate' | 'eventstartdate' | 'kind'
	> {
	kind: 'search';
	zipcode: string;
	fullAddr: string;
}

export interface TourDetailItem {
	contentid: string;
	contenttypeid: string;
	title: string;
	tel: string;
	telname: string;
	homepage: string;
	firstimage: string;
	firstimage2: string;
	areacode: string;
	sigungucode: string;
	cat1: string;
	cat2: string;
	cat3: string;
	addr1: string;
	addr2: string;
	zipcode: string;
	overview: string;
	fullAddr: string;
}
