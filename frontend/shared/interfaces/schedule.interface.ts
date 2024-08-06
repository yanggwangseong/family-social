import { PeriodsType } from '@/atoms/periodAtom';
import { FamSharedMemberResponse } from './fam.interface';
import { GroupProfileResponse } from './group.interface';
import { OmitStrict } from 'types';

export interface CreateScheduleResponse {
	id: string;
}

export interface UpdateScheduleRequest extends CreateScheduleRequest {
	scheduleId: string;
}

export interface CreateScheduleRequest {
	groupId: string;
	scheduleName: string;
	startPeriod: string;
	endPeriod: string;
	periods: PeriodsType[];
	sharedFamIds: string[];
}

export interface UpdateScheduleRequestBody
	extends OmitStrict<UpdateScheduleRequest, 'groupId' | 'scheduleId'> {}

export interface CreateScheduleRequestBody
	extends OmitStrict<CreateScheduleRequest, 'groupId'> {}

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
	startPeriod: string;
	endPeriod: string;
	updatedAt: string;
	sharedMembers: FamSharedMemberResponse[];
	group: GroupProfileResponse;
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
	stayTimeWritable: boolean;
}

export interface UpdateScheduleNameRequestBody {
	scheduleName: string;
}
