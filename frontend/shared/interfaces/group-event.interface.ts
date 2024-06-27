import { Union, eventOptionsLists } from 'types';

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
