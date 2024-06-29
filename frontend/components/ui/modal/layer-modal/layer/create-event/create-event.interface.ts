import { groupEventIdAtomType } from '@/atoms/groupEventIdAtom';
import { GroupEventItemResponse } from '@/shared/interfaces/group-event.interface';

export interface CreateEventFields {
	eventName: string;
	eventDescription: string;
	eventStartTime: string;
	eventEndTime?: string;
}

export interface CreateEventProps {
	event?: GroupEventItemResponse;
	isGroupEventId: groupEventIdAtomType;
}
