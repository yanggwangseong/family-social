import { PeriodsType, TourismType } from '@/atoms/periodAtom';
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
import { calculateTime } from '@/utils/calculate-time';
import { calculateTimeDifference } from '@/utils/calculate-time-defference';
import { stringToTime } from '@/utils/string-to-time';
import { axiosAPI } from 'api/axios';

export const ScheduleService = {
	async createSchedules({ groupId, ...rest }: CreateScheduleRequest) {
		const newPeriod = this.adjustLastStayTime(rest.periods);

		const { data } = await axiosAPI.post<CreateScheduleResponse>(
			`/groups/${groupId}/schedules`,
			{
				...rest,
				periods: newPeriod,
			} satisfies CreateScheduleRequestBody,
		);

		return data;
	},

	async updateScheduleByScheduleId({
		groupId,
		scheduleId,
		...rest
	}: UpdateScheduleRequest) {
		const newPeriod = this.adjustLastStayTime(rest.periods);

		const { data } = await axiosAPI.put<CreateScheduleResponse>(
			`/groups/${groupId}/schedules/${scheduleId}`,
			{
				...rest,
				periods: newPeriod,
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

	/**
	 * @description 만약 총 시간보다 모든 관광아이템의 머무르는 시간이 작을경우 마지막 관광 아이템에 시간 더해주기
	 * @param periods 관광 기간별
	 * @returns periods
	 */
	adjustLastStayTime(periods: PeriodsType[]) {
		return periods.map(value => {
			const totalTime = calculateTimeDifference(
				stringToTime(value.startTime),
				stringToTime(value.endTime),
			);

			const useStayTime = value.tourisms!.reduce(
				(prev, cur) => prev + calculateTime(stringToTime(cur.stayTime)),
				0,
			);

			let newTourisms: TourismType[] | undefined;

			if (useStayTime < totalTime) {
				const lastItemTime = calculateTime(
					stringToTime(value.tourisms![value.tourisms!.length - 1].stayTime),
				);
				const differenceTime = totalTime - useStayTime + lastItemTime;

				newTourisms = value.tourisms!.map((item, index) => {
					if (index === value.tourisms!.length - 1) {
						const hours = Math.floor(differenceTime / 60);
						const minutes = differenceTime % 60;
						const stayTime = `${String(hours).padStart(2, '0')}:${String(
							minutes,
						).padStart(2, '0')}`;

						return {
							...item,
							stayTime,
						};
					}

					return item;
				});

				return {
					...value,
					tourisms: newTourisms || value.tourisms,
				};
			}

			return {
				...value,
				tourisms: newTourisms || value.tourisms,
			};
		});
	},
};
