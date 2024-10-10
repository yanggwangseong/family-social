import { groupEventIdAtomType } from '@/atoms/groupEventIdAtom';
import { GroupEventItemResponse } from '@/shared/interfaces/group-event.interface';
import { SearchMemberResponse } from '@/shared/interfaces/member.interface';

export interface CreateEventFields {
	eventName: string;
	eventDescription: string;
	eventStartTime: string;
	eventEndTime?: string;
}

export interface CreateEventProps {
	event: GroupEventItemResponse | undefined;
	isGroupEventId: groupEventIdAtomType;
}

export interface CreateEventPropsWithAuth extends CreateEventProps {
	authData: SearchMemberResponse;
}
