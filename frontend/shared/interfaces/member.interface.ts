import { FamResponse } from './fam.interface';

export interface MembersBelongToGroupResponse extends FamResponse {
	role: string;
	member: SearchMemberResponse;
}

export interface MembersResponse {
	id: string;
	username: string;
	profileImage: string;
}

export interface MemberByMemberIdResponse extends MembersResponse {
	socialType: 'kakao' | 'google' | 'naver';
}

export interface MemberAccountResponse extends MembersResponse {
	phoneNumber: string;
	isMine: boolean;
	coverImage: string;
}

export interface SearchMemberResponse extends MembersResponse {
	email: string;
}

export interface UpdateProfileRequestBodyData {
	username: string;
	phoneNumber: string;
	profileImage: string;
}
