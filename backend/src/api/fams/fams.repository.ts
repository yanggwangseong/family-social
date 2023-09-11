import { FamEntity } from '@/entities/fam.entity';
import {
	ICreateFamArgs,
	IFindInvitationByFamArgs,
	IUpdateFamInvitationAcceptArgs,
} from '@/types/args/fam';
import { IDeleteGroupArgs } from '@/types/args/group';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FamsRepository extends Repository<FamEntity> {
	constructor(
		@InjectRepository(FamEntity)
		private readonly repository: Repository<FamEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async isMainRoleForMemberInGroup({ groupId, memberId }: IDeleteGroupArgs) {
		const role = await this.repository.findOneOrFail({
			select: {
				role: true,
			},
			where: {
				groupId: groupId,
				memberId: memberId,
			},
		});

		return role;
	}

	async getMemberGroupCountByGroupId({ groupId }: { groupId: string }) {
		const memberGroup = await this.repository.count({
			where: {
				groupId: groupId,
				invitationAccepted: true,
			},
		});

		return memberGroup;
	}

	async findInvitationByFam({
		groupId,
		memberId,
		famId,
	}: IFindInvitationByFamArgs) {
		const fam = await this.repository.findOne({
			where: {
				id: famId,
				groupId: groupId,
				memberId: memberId,
			},
			select: {
				id: true,
			},
		});

		return fam;
	}

	async findOrFailFamById({ famId }: { famId: string }) {
		const fam = await this.repository.findOneOrFail({
			where: {
				id: famId,
			},
			select: {
				id: true,
			},
		});

		return fam;
	}

	async createFam({
		memberId,
		groupId,
		role,
		invitationAccepted,
	}: ICreateFamArgs) {
		const insertResult = await this.repository.insert({
			id: uuidv4(),
			memberId: memberId,
			groupId: groupId,
			role: role,
			invitationAccepted: invitationAccepted,
		});

		const id: string = insertResult.identifiers[0].id;

		return this.findOrFailFamById({ famId: id });
	}

	async updateFamInvitationAccept({
		memberId,
		famId,
		invitationAccepted,
		groupId,
	}: IUpdateFamInvitationAcceptArgs) {
		await this.update(
			{ id: famId, memberId: memberId, groupId: groupId },
			{ invitationAccepted: invitationAccepted },
		);
	}

	async deleteGroupAllMember({ groupId }: { groupId: string }) {
		const { affected } = await this.delete({
			groupId: groupId,
		});

		return !!affected;
	}

	async deleteGroupMemberByFamId({
		groupId,
		memberId,
		famId,
		ownMemberId,
	}: {
		groupId: string;
		memberId: string;
		famId: string;
		ownMemberId: string;
	}) {
		const { affected } = await this.delete({
			id: famId,
		});

		return !!affected;
	}
}
