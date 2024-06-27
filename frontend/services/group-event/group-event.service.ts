import {
	CreateGroupEventRequest,
	GroupEventItemResponse,
	GroupEventQueryOptions,
} from '@/shared/interfaces/group-event.interface';
import { BasicPaginationResponse } from '@/shared/interfaces/pagination.interface';
import { axiosAPI } from 'api/axios';

export const GroupEventService = {
	async getListGroupEvent(
		queryOptions: GroupEventQueryOptions,
		groupId: string,
	) {
		const { eventStartDate, page, limit, order } = queryOptions;

		const { data } = await axiosAPI.get<
			BasicPaginationResponse<GroupEventItemResponse>
		>(
			`/groups/${groupId}/group-events?where__eventStartDate__more_than_or_equal=${eventStartDate}&order__eventStartDate=${order}&page=${page}&limit=${limit}"`,
		);

		return data;
	},

	async createGroupEvent(
		createGroupEventRequest: CreateGroupEventRequest,
		groupId: string,
	) {
		const { data } = await axiosAPI.post(`/groups/${groupId}/group-events`, {
			...createGroupEventRequest,
		} satisfies CreateGroupEventRequest);

		return data;
	},
};
