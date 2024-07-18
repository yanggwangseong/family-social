export interface TourAreaCodeItem {
	code: string;
	name: string;
	rnum: number;
}

// getServiceCategories
export interface TourServiceCategoriesResponse {}

export interface TourListResponse {
	items: {
		item: any[];
	};
	numOfRows: number;
	pageNo: number;
	totalCount: number;
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
