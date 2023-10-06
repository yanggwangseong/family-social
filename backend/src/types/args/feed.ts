export interface ICreateFeedArgs {
	contents: string;
	isPublic: boolean;
	groupId: string;
	memberId: string;
}

export interface IUpdateFeedArgs extends Omit<ICreateFeedArgs, 'memberId'> {
	feedId: string;
}
