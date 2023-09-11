import { Injectable } from '@nestjs/common';
import { FamsRepository } from './fams.repository';
import {
	IFindInvitationByFamArgs,
	IUpdateFamInvitationAcceptArgs,
} from '@/types/args/fam';
import {
	EntityConflictException,
	EntityNotFoundException,
} from '@/common/exception/service.exception';

@Injectable()
export class FamsService {
	constructor(private readonly famsRepository: FamsRepository) {}

	async createFamByMemberOfGroup({
		memberId,
		groupId,
	}: {
		memberId: string;
		groupId: string;
	}) {
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
	}: IUpdateFamInvitationAcceptArgs) {
		await this.famsRepository.updateFamInvitationAccept({
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
	}) {
		const status = await this.famsRepository.deleteFam({
			groupId,
			memberId,
			famId,
		});

		if (!status)
			throw EntityConflictException(
				'그룹멤버를 삭제하던 도중 에러가 발생했습니다.',
			);
	}

	async checkIfFamExists({
		groupId,
		memberId,
		famId,
	}: IFindInvitationByFamArgs) {
		const fam = await this.famsRepository.findInvitationByFam({
			groupId: groupId,
			memberId: memberId,
			famId: famId,
		});

		if (!fam) {
			throw EntityNotFoundException('초대 받은 그룹을 찾을 수 없습니다.');
		}

		return fam;
	}
}
