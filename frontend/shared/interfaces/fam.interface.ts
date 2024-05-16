import { AuthResponse } from './auth.interface';
import { GroupResponse } from './group.interface';
import { SearchMemberResponse } from './member.interface';

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

export interface FamSharedMemberResponse extends FamResponse {
	role: 'main' | 'user';
	memberId: string;
	member: SearchMemberResponse;
}
