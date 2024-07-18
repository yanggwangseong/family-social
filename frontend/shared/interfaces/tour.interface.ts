export interface TourAreaCodeItem {
	code: string;
	name: string;
	rnum: number;
}

// getServiceCategories
export interface TourServiceCategoriesResponse extends TourAreaCodeItem {}

export interface TourListResponse {
	items: {
		item: any[];
	};
	numOfRows: number;
	pageNo: number;
	totalCount: number;
}

export interface TourFestivalItem {
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

export interface TourismItem {}

export interface TourDetailResponse {
	items: {
		additional: {
			item: any[];
		};
		item: any[];
		image: {
			item: any[];
		};
		introduction: {
			item: any[];
		};
	};
}
