import { FamSharedMemberResponse } from '@/shared/interfaces/fam.interface';
import { GroupProfileResponse } from '@/shared/interfaces/group.interface';

export interface SharedMembersProps {
	sharedMembers: FamSharedMemberResponse[];
	sharedGroup: GroupProfileResponse;
}
