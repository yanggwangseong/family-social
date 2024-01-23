import { PeriodsType } from '@/atoms/periodAtom';

export interface CreateScheduleResponse {
	id: string;
}

export interface CreateScheduleRequest {
	groupId: string;
	schedules: PeriodsType[];
}

export interface GetScheduleListResponse {
	id: string;
	updateAt: string;
	groupId: string;
	schdulePeriods: TourismPeriodResponse[];
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
