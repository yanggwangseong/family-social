import { Trole } from '@/entities/member-group.entity';

export interface ICreateMemberGroupArgs {
	memberId: string;
	groupId: string;
	role: Trole;
	invitationAccepted: boolean;
}

export interface IUpdateGroupMemberInvitationAccept
	extends Pick<ICreateMemberGroupArgs, 'memberId' | 'invitationAccepted'> {
	famId: string;
}
