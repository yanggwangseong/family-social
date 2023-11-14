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
