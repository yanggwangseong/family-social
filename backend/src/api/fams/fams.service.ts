import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import {
	EntityConflictException,
	EntityNotFoundException,
} from '@/common/exception/service.exception';
import {
	ERROR_DELETE_GROUP_MEMBER,
	ERROR_GROUP_MEMBER_NOT_FOUND,
	ERROR_INVITED_GROUP_NOT_FOUND,
} from '@/constants/business-error';
import { FamGroupDetailResDto } from '@/models/dto/fam/res/fam-group-detail-res.dto';
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

	async createFamByMemberOfGroup(
		createFamArgs: {
			memberId: string;
			groupId: string;
			invitationAccepted: boolean;
		},
		qr?: QueryRunner,
	): Promise<void> {
		const newFam = this.famsRepository.create({
			id: uuidv4(),
			...createFamArgs,
			role: 'user',
		});
		await this.famsRepository.createFam(newFam, qr);
		//[TODO] 그룹 초대 notification
	}

	async updateFamInvitationAccept(
		updateFamInvitationAcceptArgs: IUpdateFamInvitationAcceptArgs,
	): Promise<FamResDto> {
		return await this.famsRepository.updateFamInvitationAccept({
			...updateFamInvitationAcceptArgs,
		});
	}

	async deleteFamByMemberOfGroup(deleteFamByMemberOfGroupArgs: {
		groupId: string;
		memberId: string;
		famId: string;
	}): Promise<void> {
		const status = await this.famsRepository.deleteFam({
			...deleteFamByMemberOfGroupArgs,
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

	async getGroupByGroupId(
		groupId: string,
		memberId: string,
	): Promise<FamGroupDetailResDto> {
		const member = await this.famsRepository.getByGroupId(groupId, memberId);

		if (!member) throw EntityNotFoundException(ERROR_GROUP_MEMBER_NOT_FOUND);

		const memberCount = await this.famsRepository.getCountBelongToGroupMember(
			groupId,
		);

		return {
			...member,
			memberCount,
		};
	}

	async checkIfFamExists(
		findInvitationByFamArgs: IFindInvitationByFamArgs,
	): Promise<FamResDto> {
		const fam = await this.famsRepository.findInvitationByFam({
			...findInvitationByFamArgs,
		});

		if (!fam) {
			throw EntityNotFoundException(ERROR_INVITED_GROUP_NOT_FOUND);
		}

		return fam;
	}
}
