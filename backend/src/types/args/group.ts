export interface IDeleteGroupArgs {
	groupId: string;
	memberId: string;
}

export interface IMembersBelongToGroupArgs {
	groupId: string;
	memberId: string;
	page: number;
	limit: number;
}
