import { MembersResponse, SearchMemberResponse } from './member.interface';

export interface NotificationResponse {
	list: NotificationItem[];
	page: number;
	totalPage: number;
}

export interface NotificationItem {
	id: string;
	notificationTypeId: string;
	recipientId: string;
	senderId: string;
	notificationTitle: string;
	notificationDescription: string;
	notificationFeedId: string;
	isRead: boolean;
	createdAt: string;
	sender: SearchMemberResponse;
}
