import { GroupResponse } from './group.interface';

export interface FamInvitationsResponse {
	list: FamInvitation[];
	count: number;
}

export interface FamInvitation {
	id: string;
	invitationAccepted: false;
	group: GroupResponse;
}
