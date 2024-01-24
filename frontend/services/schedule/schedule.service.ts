import { PeriodsType } from '@/atoms/periodAtom';
import {
	CreateScheduleRequest,
	CreateScheduleResponse,
	GetScheduleListResponse,
} from '@/shared/interfaces/schedule.interface';
import { axiosAPI } from 'api/axios';

export const ScheduleService = {
	async createSchedules({
		groupId,
		scheduleName,
		startPeriod,
		endPeriod,
		periods,
	}: CreateScheduleRequest) {
		const { data } = await axiosAPI.post<CreateScheduleResponse>(
			`/groups/${groupId}/schedules`,
			{
				scheduleName,
				startPeriod,
				endPeriod,
				periods,
			},
		);

		return data;
	},

	async getScheduleList(page: number, groupId: string) {
		const { data } = await axiosAPI.get<GetScheduleListResponse[]>(
			`/groups/${groupId}/schedules?page=${page}&limit=10`,
		);

		return data;
	},
};