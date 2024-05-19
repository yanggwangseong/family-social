import { FamSharedMemberResponse } from '@/shared/interfaces/fam.interface';

export interface SharedMembersHoverModalProps {
	sharedMembers: FamSharedMemberResponse[];
}

export interface SharedMemberItemProps {
	sharedMember: FamSharedMemberResponse;
}
