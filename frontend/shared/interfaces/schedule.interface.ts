import { PeriodsType } from '@/atoms/periodAtom';

export interface CreateScheduleResponse {
	id: string;
}

export interface CreateScheduleRequest {
	groupId: string;
	schedules: PeriodsType[];
}
