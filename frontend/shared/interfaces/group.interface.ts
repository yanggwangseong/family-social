import { FamWithRoleResponse } from './fam.interface';

export interface GroupResponse {
	id: string;
	groupName: string;
	groupDescription: string;
}

export interface MemberBelongToGroupsResponse extends FamWithRoleResponse {
	group: GroupProfileResponse;
}

export interface GroupProfileResponse extends GroupResponse {
	groupCoverImage: string;
}

export interface CreateGroupRequest {
	groupName: string;
	groupDescription: string;
}

export interface UpdateGroupRequest extends CreateGroupRequest {}
