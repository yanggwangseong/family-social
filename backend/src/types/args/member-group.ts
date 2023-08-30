import { Trole } from '@/entities/member-group.entity';

export interface ICreateMemberGroupArgs {
	memberId: string;
	groupId: string;
	role: Trole;
	invitationAccepted: boolean;
}
