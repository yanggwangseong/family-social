import { FamInvitationsResDto } from '@/models/dto/fam/res/fam-invitations-res.dto';
import { FamResDto } from '@/models/dto/fam/res/fam-res.dto';
import { FamEntity, roleType } from '@/models/entities/fam.entity';
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
import { BelongToGroupResDto } from '../dto/group/res/belong-to-group.res.dto';

@Injectable()
export class FamsRepository extends Repository<FamEntity> {
	constructor(
		@InjectRepository(FamEntity)
		private readonly repository: Repository<FamEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async getMemberBelongToGroups(
		memberId: string,
	): Promise<BelongToGroupResDto[]> {
		return await this.repository.find({
			select: {
				id: true,
				invitationAccepted: true,
				group: {
					id: true,
					groupName: true,
					groupDescription: true,
				},
			},
			where: {
				memberId: memberId,
			},
			relations: {
				group: true,
			},
		});
	}

	async isMainRoleForMemberInGroup({
		groupId,
		memberId,
	}: IDeleteGroupArgs): Promise<{ role: roleType }> {
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
				member: {
					id: true,
					username: true,
				},
			},
			relations: {
				group: true,
				member: true,
			},
		});

		return result;
	}

	async getMemberGroupCountByGroupId({
		groupId,
	}: {
		groupId: string;
	}): Promise<number> {
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

	async deleteGroupAllMember({
		groupId,
	}: {
		groupId: string;
	}): Promise<boolean> {
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
	}): Promise<boolean> {
		const { affected } = await this.delete({
			id: famId,
			groupId: groupId,
			memberId: memberId,
		});

		return !!affected;
	}
}