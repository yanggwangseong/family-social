import {
	CreateGroupEventRequest,
	GroupEventItemResponse,
	GroupEventQueryOptions,
	UpdateGroupEventRequest,
} from '@/shared/interfaces/group-event.interface';
import { BasicPaginationResponse } from '@/shared/interfaces/pagination.interface';
import { axiosAPI } from 'api/axios';

export const GroupEventService = {
	async getOneGroupEvent(groupId: string, groupEventId: string) {
		const { data } = await axiosAPI.get<GroupEventItemResponse>(
			`/groups/${groupId}/group-events/${groupEventId}`,
		);

		return data;
	},

	async getGroupEventsByBelongToGroup(queryOptions: GroupEventQueryOptions) {
		const { eventStartDate, page, limit, order } = queryOptions;
		const { data } = await axiosAPI.get<
			BasicPaginationResponse<GroupEventItemResponse>
		>(
			`/group-events?where__eventStartDate__more_than_or_equal=${eventStartDate}&order__eventStartDate=${order}&page=${page}&limit=${limit}`,
		);

		return data;
	},

	async getListGroupEvent(
		queryOptions: GroupEventQueryOptions,
		groupId: string,
	) {
		const { eventStartDate, page, limit, order } = queryOptions;

		const { data } = await axiosAPI.get<
			BasicPaginationResponse<GroupEventItemResponse>
		>(
			`/groups/${groupId}/group-events?where__eventStartDate__more_than_or_equal=${eventStartDate}&order__eventStartDate=${order}&page=${page}&limit=${limit}`,
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

	async updateGroupEvent(
		updateGroupEventRequest: UpdateGroupEventRequest,
		groupId: string,
		groupEventId: string,
	) {
		const { data } = await axiosAPI.put(
			`/groups/${groupId}/group-events/${groupEventId}`,
			{
				...updateGroupEventRequest,
			} satisfies UpdateGroupEventRequest,
		);

		return data;
	},

	async deleteGroupEvent(groupId: string, groupEventId: string) {
		const { data } = await axiosAPI.delete<void>(
			`/groups/${groupId}/group-events/${groupEventId}`,
		);

		return data;
	},
};
