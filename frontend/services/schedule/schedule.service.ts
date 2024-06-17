import {
	CreateScheduleRequest,
	CreateScheduleRequestBody,
	CreateScheduleResponse,
	GetScheduleListResponse,
	ScheduleItemResponse,
	UpdateScheduleNameRequestBody,
	UpdateScheduleRequest,
	UpdateScheduleRequestBody,
} from '@/shared/interfaces/schedule.interface';
import { axiosAPI } from 'api/axios';

export const ScheduleService = {
	async createSchedules({ groupId, ...rest }: CreateScheduleRequest) {
		const { data } = await axiosAPI.post<CreateScheduleResponse>(
			`/groups/${groupId}/schedules`,
			{
				...rest,
			} satisfies CreateScheduleRequestBody,
		);

		return data;
	},

	async updateScheduleByScheduleId({
		groupId,
		scheduleId,
		...rest
	}: UpdateScheduleRequest) {
		const { data } = await axiosAPI.put<CreateScheduleResponse>(
			`/groups/${groupId}/schedules/${scheduleId}`,
			{
				...rest,
			} satisfies UpdateScheduleRequestBody,
		);

		return data;
	},

	async getScheduleList(page: number, limit: number) {
		const { data } = await axiosAPI.get<GetScheduleListResponse>(
			`/schedules?page=${page}&limit=${limit}`,
		);

		return data;
	},

	async getScheduleById(groupId: string, scheduleId: string) {
		const { data } = await axiosAPI.get<ScheduleItemResponse>(
			`/groups/${groupId}/schedules/${scheduleId}`,
		);

		data.schedulePeriods.map(item => {
			item.startTime = `${item.startTime.split(':')[0]}:${
				item.startTime.split(':')[1]
			}`;

			item.endTime = `${item.endTime.split(':')[0]}:${
				item.endTime.split(':')[1]
			}`;

			item.tourisms.map(data => {
				const [start, end] = data.stayTime.split(':');
				data.stayTime = `${start}:${end}`;
				return data;
			});

			return item;
		});

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
			} satisfies UpdateScheduleNameRequestBody,
		);

		return data;
	},

	async uploadScheduleThumbnailImage(
		img: File,
		scheduleId: string,
	): Promise<string[]> {
		const formData = new FormData();
		formData.append('files', img);

		const { data } = await axiosAPI.patch(
			`/schedules/${scheduleId}/uploads/thumbnail-image`,
			formData,
			{
				headers: { 'Content-Type': 'multipart/form-data' },
			},
		);

		return data;
	},
};
