import { PeriodsType } from '@/atoms/periodAtom';
import {
	CreateScheduleRequest,
	CreateScheduleResponse,
	GetScheduleListResponse,
	ScheduleItemResponse,
} from '@/shared/interfaces/schedule.interface';
import { axiosAPI } from 'api/axios';
import { AxiosError } from 'axios';

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
		const { data } = await axiosAPI.get<GetScheduleListResponse>(
			`/groups/${groupId}/schedules?page=${page}&limit=3`,
		);

		return data;
	},

	async getScheduleById(groupId: string, scheduleId: string) {
		const { data } = await axiosAPI.get<ScheduleItemResponse>(
			`/groups/${groupId}/schedules/${scheduleId}`,
		);

		return data;
	},

	async deleteSchedule(scheduleId: string, groupId: string) {
		const { data } = await axiosAPI.delete<void>(
			`/groups/${groupId}/schedules/${scheduleId}`,
		);

		return data;
	},

	async updateScheduleName(scheduleId: string, scheduleName: string) {
		const { data } = await axiosAPI.patch<void>(
			`/schedules/${scheduleId}/title`,
			{
				scheduleName,
			},
		);

		return data;
	},
};
