import { FamResponse } from './fam.interface';

export interface MembersBelongToGroupResponse extends FamResponse {
	role: string;
	member: MembersResponse;
}

export interface MembersResponse {
	id: string;
	username: string;
	profileImage: string;
}

export interface MemberAccountResponse extends MembersResponse {
	phoneNumber: string;
	isMine: boolean;
	coverImage: string;
}

export interface SearchMemberResponse extends MembersResponse {
	email: string;
}
