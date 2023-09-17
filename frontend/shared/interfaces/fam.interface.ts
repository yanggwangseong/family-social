import { AuthResponse } from './auth.interface';
import { GroupResponse } from './group.interface';

export interface FamInvitationsResponse {
	list: FamInvitation[];
	count: number;
}

export interface FamInvitation extends FamResponse {
	group: GroupResponse;
	member: AuthResponse;
}

export interface FamResponse {
	id: string;
	invitationAccepted: false;
}
