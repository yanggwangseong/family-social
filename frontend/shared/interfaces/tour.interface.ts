export interface TourAreaCodesResponse {
	items: {
		item: TourAreaCodeItem[];
	};
	numOfRows: number;
	pageNo: number;
	totalCount: number;
}

export interface TourAreaCodeItem {
	code: string;
	name: string;
	rnum: number;
}

// getServiceCategories
export interface TourServiceCategoriesResponse extends TourAreaCodesResponse {}
