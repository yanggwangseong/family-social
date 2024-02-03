import { PeriodsType } from '@/atoms/periodAtom';

export interface CreateScheduleResponse {
	id: string;
}

export interface CreateScheduleRequest {
	groupId: string;
	scheduleName: string;
	startPeriod: string;
	endPeriod: string;
	periods: PeriodsType[];
}

export interface GetScheduleListResponse {
	list: ScheduleResponse[];
	page: number;
	totalPage: number;
}

export interface ScheduleResponse {
	id: string;
	groupId: string;
	scheduleImage: string;
	scheduleName: string;
	startPeriod: Date;
	endPeriod: Date;
	updatedAt: string;
}

export interface ScheduleItemResponse extends ScheduleResponse {
	schedulePeriods: TourismPeriodResponse[];
}

export interface TourismPeriodResponse {
	id: string;
	period: string;
	startTime: string;
	endTime: string;
	tourisms: TourismResponse[];
}

export interface TourismResponse {
	id: string;
	contentId: string;
	stayTime: string;
	tourismImage: string;
	title: string;
	position: number;
}
