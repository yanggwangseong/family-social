import { SearchMemberResponse } from '@/shared/interfaces/member.interface';

export interface CreateGroupFields {
	groupName: string;
	groupDescription: string;
}

export interface CreateGroupPropsWithAuth {
	authData: SearchMemberResponse;
}
