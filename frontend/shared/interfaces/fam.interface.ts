import { AuthResponse } from './auth.interface';
import { GroupProfileResponse, GroupResponse } from './group.interface';
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
	invitationAccepted: boolean;
}

export interface FamSharedMemberResponse extends FamResponse {
	role: 'main' | 'user';
	memberId: string;
	member: SearchMemberResponse;
}

export interface FamAcceptInvitationRequest {
	invitationAccepted: boolean;
}

export interface FamAcceptInvitationArgs {
	groupId: string;
	memberId: string;
	famId: string;
}

export interface FamRejectInvitationArgs extends FamAcceptInvitationArgs {}

export interface GroupDetailResponse extends FamResponse {
	group: GroupProfileResponse;
	memberCount: number;
	followers: string[];
	followings: string[];
}
