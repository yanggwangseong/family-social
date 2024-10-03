export interface IDeleteGroupArgs {
	groupId: string;
	memberId: string;
}

export interface IMembersBelongToGroupArgs {
	groupId: string;
	memberId: string;
	page: number;
	limit: number;
	excludeSelf: boolean;
}

export interface ICreateGroupArgs {
	memberId: string;
	groupName: string;
	groupDescription?: string;
}

export interface IUpdateGroupArgs extends ICreateGroupArgs {
	groupId: string;
}
