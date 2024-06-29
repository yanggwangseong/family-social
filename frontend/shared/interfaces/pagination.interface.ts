export interface BasicPaginationResponse<T> {
	list: T[];
	page: number;
	totalPage: number;
}
