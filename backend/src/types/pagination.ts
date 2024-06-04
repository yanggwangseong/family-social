export interface IPaginationArgs {
	/**
	 * 페이지네이션의 페이지 값
	 * @minimum 1
	 */
	page: number;

	/**
	 * @mininum 3
	 * @maximum 100
	 */
	limit?: number;
}

export interface BasicPaginationResponse<T> {
	list: T[];
	page: number;
	count: number;
	take: number;
}

export interface CursorPaginationResponse<T> {
	list: T[];
	lastItem: T | null;
	nextUrl: URL | null;
}
