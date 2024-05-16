export interface ICreateScheduleArgs {
	memberId: string;
	groupId: string;
	scheduleName: string;
	startPeriod: Date;
	endPeriod: Date;
}

export interface ICreateSharedScheduleMemberArgs {
	id: string;
	sharedFamId: string;
	sharedScheduleId: string;
}
