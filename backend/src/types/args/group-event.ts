import { EventType, Union } from '../index';

export interface ICreateGroupEventArgs {
	eventType: Union<typeof EventType>;
	eventGroupId: string;
	eventCoverImage: string;
	eventName: string;
	eventDescription: string;
	eventStartDate: string;
	eventStartTime: string;
	eventEndDate?: string;
	eventEndTime?: string;
}
