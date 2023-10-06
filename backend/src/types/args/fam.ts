import { roleType } from '@/models/entities/fam.entity';

export interface ICreateFamArgs {
	memberId: string;
	groupId: string;
	role: roleType;
	invitationAccepted: boolean;
}

export interface IUpdateFamInvitationAcceptArgs
	extends Omit<ICreateFamArgs, 'role'> {
	famId: string;
}

export interface IFindInvitationByFamArgs
	extends Omit<IUpdateFamInvitationAcceptArgs, 'invitationAccepted'> {}
