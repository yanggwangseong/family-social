import { FamInvitationsResDto } from '@/dto/fam/res/fam-invitations-res.dto';
import { FamResDto } from '@/dto/fam/res/fam-res.dto';
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

	async getInvitationsList({
		memberId,
	}: {
		memberId: string;
	}): Promise<[FamInvitationsResDto[], number]> {
		const result = await this.repository.findAndCount({
			where: {
				memberId: memberId,
				invitationAccepted: false,
			},
			select: {
				id: true,
				invitationAccepted: true,
				group: {
					id: true,
					groupName: true,
					groupDescription: true,
				},
			},
			relations: {
				group: true,
			},
		});

		return result;
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
	}: IFindInvitationByFamArgs): Promise<FamResDto | null> {
		const fam = await this.repository.findOne({
			where: {
				id: famId,
				groupId: groupId,
				memberId: memberId,
			},
			select: {
				id: true,
				invitationAccepted: true,
			},
		});

		return fam;
	}

	async findOrFailFamById({ famId }: { famId: string }): Promise<FamResDto> {
		const fam = await this.repository.findOneOrFail({
			where: {
				id: famId,
			},
			select: {
				id: true,
				invitationAccepted: true,
			},
		});

		return fam;
	}

	async createFam({
		memberId,
		groupId,
		role,
		invitationAccepted,
	}: ICreateFamArgs): Promise<FamResDto> {
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
	}: IUpdateFamInvitationAcceptArgs): Promise<FamResDto> {
		await this.update(
			{ id: famId, memberId: memberId, groupId: groupId },
			{ invitationAccepted: invitationAccepted },
		);

		return this.findOrFailFamById({ famId: famId });
	}

	async deleteGroupAllMember({ groupId }: { groupId: string }) {
		const { affected } = await this.delete({
			groupId: groupId,
		});

		return !!affected;
	}

	async deleteFam({
		groupId,
		memberId,
		famId,
	}: {
		groupId: string;
		memberId: string;
		famId: string;
	}) {
		const { affected } = await this.delete({
			id: famId,
			groupId: groupId,
			memberId: memberId,
		});

		return !!affected;
	}
}
