import { Trole } from '@/entities/member-group.entity';

export interface ICreateFamArgs {
	memberId: string;
	groupId: string;
	role: Trole;
	invitationAccepted: boolean;
}

export interface IUpdateFamInvitationAcceptArgs
	extends Omit<ICreateFamArgs, 'role'> {
	famId: string;
}

export interface IFindInvitationByFamArgs
	extends Omit<IUpdateFamInvitationAcceptArgs, 'invitationAccepted'> {}
