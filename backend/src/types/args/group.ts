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

export interface ICreateGroupArgs {
	memberId: string;
	groupName: string;
	groupDescription?: string;
}
