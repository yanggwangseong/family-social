import { roleType } from '@/models/entities/fam.entity';

import { PartialPick } from '../index';

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

export interface ICreateFamByMemberOfGroupArgs extends ICreateFamArgs {
	groupId: string;
}

export type createFamByMemberOfGroupArgs = PartialPick<ICreateFamArgs, 'role'>;
