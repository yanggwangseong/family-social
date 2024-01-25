import { Injectable } from '@nestjs/common';

import {
	EntityConflictException,
	EntityNotFoundException,
} from '@/common/exception/service.exception';
import {
	ERROR_DELETE_GROUP_MEMBER,
	ERROR_INVITED_GROUP_NOT_FOUND,
} from '@/constants/business-error';
import { FamInvitationsResDto } from '@/models/dto/fam/res/fam-invitations-res.dto';
import { FamResDto } from '@/models/dto/fam/res/fam-res.dto';
import { FamsRepository } from '@/models/repositories/fams.repository';
import {
	IFindInvitationByFamArgs,
	IUpdateFamInvitationAcceptArgs,
} from '@/types/args/fam';

@Injectable()
export class FamsService {
	constructor(private readonly famsRepository: FamsRepository) {}

	async createFamByMemberOfGroup({
		memberId,
		groupId,
	}: {
		memberId: string;
		groupId: string;
	}): Promise<void> {
		await this.famsRepository.createFam({
			memberId: memberId,
			groupId: groupId,
			role: 'user',
			invitationAccepted: false,
		});
		//[TODO] 그룹 초대 notification
	}

	async updateFamInvitationAccept({
		groupId,
		memberId,
		famId,
		invitationAccepted,
	}: IUpdateFamInvitationAcceptArgs): Promise<FamResDto> {
		return await this.famsRepository.updateFamInvitationAccept({
			groupId,
			memberId,
			famId,
			invitationAccepted,
		});
	}

	async deleteFamByMemberOfGroup({
		groupId,
		memberId,
		famId,
	}: {
		groupId: string;
		memberId: string;
		famId: string;
	}): Promise<void> {
		const status = await this.famsRepository.deleteFam({
			groupId,
			memberId,
			famId,
		});

		if (!status) throw EntityConflictException(ERROR_DELETE_GROUP_MEMBER);
	}

	async getInvitationsList({ memberId }: { memberId: string }): Promise<{
		list: FamInvitationsResDto[];
		count: number;
	}> {
		const [list, count] = await this.famsRepository.getInvitationsList({
			memberId,
		});

		return {
			list,
			count,
		};
	}

	async checkIfFamExists({
		groupId,
		memberId,
		famId,
	}: IFindInvitationByFamArgs): Promise<FamResDto> {
		const fam = await this.famsRepository.findInvitationByFam({
			groupId: groupId,
			memberId: memberId,
			famId: famId,
		});

		if (!fam) {
			throw EntityNotFoundException(ERROR_INVITED_GROUP_NOT_FOUND);
		}

		return fam;
	}
}
