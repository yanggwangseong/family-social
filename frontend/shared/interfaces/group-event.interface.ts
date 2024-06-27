import { Union, eventOptionsLists } from 'types';
import { GroupProfileResponse } from './group.interface';
import { SearchMemberResponse } from './member.interface';

export interface CreateGroupEventRequest {
	eventType: Union<typeof eventOptionsLists>;
	eventCoverImage: string;
	eventName: string;
	eventDescription: string;
	eventStartDate: string;
	eventStartTime: string;
	eventEndDate?: string;
	eventEndTime?: string;
}

export interface GroupEventItemResponse {
	id: string;
	eventType: Union<typeof eventOptionsLists>;
	eventGroupId: string;
	eventOrganizerId: string;
	eventCoverImage: string;
	eventName: string;
	eventDescription: string;
	eventStartDate: string;
	eventStartTime: string;
	eventEndDate?: string;
	eventEndTime?: string;
	createdAt: Date;
	eventGroup: GroupProfileResponse;
	eventOrganizer: SearchMemberResponse;
}
