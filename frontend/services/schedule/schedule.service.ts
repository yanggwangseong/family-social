import { PeriodsType } from '@/atoms/periodAtom';
import {
	CreateScheduleRequest,
	CreateScheduleResponse,
} from '@/shared/interfaces/schedule.interface';
import { axiosAPI } from 'api/axios';

export const ScheduleService = {
	async createSchedules({ groupId, schedules }: CreateScheduleRequest) {
		const { data } = await axiosAPI.post<CreateScheduleResponse>(
			`/groups/${groupId}/schedules`,
			schedules,
		);

		return data;
	},
};
