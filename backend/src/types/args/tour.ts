export interface ICreateTourArgs {
	memberId: string;
	groupId: string;
	periods: ITourPeriodArgs[];
}

export interface ITourPeriodArgs {
	period: string;
	startTime: string;
	endTime: string;
	tourisms: ITourismArgs[];
}

export interface ITourismArgs {
	contentId: string;
	stayTime: string;
	tourismImage: string;
	title: string;
	position: number;
}
