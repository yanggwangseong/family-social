import { FamResponse } from './fam.interface';

export interface GroupResponse {
	id: string;
	groupName: string;
	groupDescription: string;
}

export interface MemberBelongToGroupsResponse extends FamResponse {
	group: GroupResponse;
}

export interface GroupProfileResponse extends GroupResponse {
	groupCoverImage: string;
}
