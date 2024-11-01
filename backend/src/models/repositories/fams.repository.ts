import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, QueryRunner, Repository } from 'typeorm';

import { MAIN_ROLE } from '@/constants/string-constants';
import { FamInvitationsResDto } from '@/models/dto/fam/res/fam-invitations-res.dto';
import { FamResDto } from '@/models/dto/fam/res/fam-res.dto';
import { FamEntity, roleType } from '@/models/entities/fam.entity';
import { OmitStrict } from '@/types';
import {
	IFindInvitationByFamArgs,
	IUpdateFamInvitationAcceptArgs,
} from '@/types/args/fam';
import { IDeleteGroupArgs } from '@/types/args/group';
import { OverrideInsertFeild } from '@/types/repository';

import { BelongToGroupResDto } from '../dto/group/res/belong-to-group.res.dto';
import { GroupAccessLevelResDto } from '../dto/group/res/group-access-level-res.dto';
import { GroupMembersResDto } from '../dto/group/res/group-members.res.dto';

@Injectable()
export class FamsRepository extends Repository<FamEntity> {
	constructor(
		@InjectRepository(FamEntity)
		private readonly repository: Repository<FamEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	getFamsRepository(qr?: QueryRunner) {
		return qr
			? qr.manager.getRepository<FamEntity>(FamEntity)
			: this.repository;
	}

	async getByGroupId(groupId: string, memberId: string) {
		return await this.repository.findOne({
			select: {
				id: true,
				invitationAccepted: true,
				group: {
					id: true,
					groupName: true,
					groupCoverImage: true,
					groupDescription: true,
				},
			},
			where: {
				groupId,
				memberId,
			},
			relations: {
				group: true,
			},
		});
	}

	// async getGroupByGroupIdPublic(
	// 	groupId: string,
	// ): Promise<
	// 	OmitStrict<
	// 		GroupAccessLevelResDto,
	// 		'accessLevel' | 'followers' | 'followings' | 'memberCount'
	// 	>
	// > {
	// 	return await this.repository.findOneOrFail({
	// 		select: {
	// 			id: true,
	// 			invitationAccepted: true,
	// 			role: true,
	// 			group: {
	// 				id: true,
	// 				groupName: true,
	// 				groupCoverImage: true,
	// 				groupDescription: true,
	// 			},
	// 		},
	// 		where: {
	// 			groupId,
	// 		},
	// 		relations: {
	// 			group: true,
	// 		},
	// 	});
	// }

	async getCountBelongToGroupMember(groupId: string) {
		return await this.repository.countBy({
			groupId,
		});
	}

	async getMemberListBelongToGroup({
		take,
		skip,
		overrideWhere,
	}: {
		take: number;
		skip: number;
		overrideWhere: FindOptionsWhere<FamEntity>;
	}): Promise<GroupMembersResDto[]> {
		return await this.repository.find({
			select: {
				id: true,
				invitationAccepted: true,
				role: true,
				member: {
					id: true,
					profileImage: true,
					username: true,
					email: true,
				},
			},
			where: {
				...overrideWhere,
			},
			relations: {
				member: true,
			},
			take,
			skip,
		});
	}

	/**
	 * 채팅방 생성을 위한 그룹 조회
	 * @param memberId 사용자 아이디
	 * @description 채팅방 생성을 위해 자신이 main역할을 가진 채팅방 생성 가능한 그룹을 조회합니다.
	 * @returns 그룹 리스트
	 */
	async getMemberBelongToGroupsForChatCreation(
		memberId: string,
	): Promise<BelongToGroupResDto[]> {
		const groups = await this.createQueryBuilder('fam')
			.select([
				'fam.id as "id"',
				'fam.invitationAccepted as "invitationAccepted"',
				'fam.role as "role"',
				'group.id as "groupId"',
				'group.groupName as "groupName"',
				'group.groupDescription as "groupDescription"',
				'group.groupCoverImage as "groupCoverImage"',
				'COUNT(DISTINCT otherFam.id) as memberCount',
			])
			.innerJoin('fam.group', 'group')
			.leftJoin('group.chats', 'chat')
			.leftJoin(
				'group.groupByMemberGroups',
				'otherFam',
				'otherFam.invitationAccepted = :accepted',
				{ accepted: true },
			)
			.where('fam.memberId = :memberId', { memberId })
			.andWhere('chat.id IS NULL')
			.groupBy('fam.id')
			.addGroupBy('group.id')
			.having('COUNT(DISTINCT otherFam.id) > 1')
			.andHaving('fam.role = :role', { role: MAIN_ROLE })
			.getRawMany();

		return groups.map((item) => {
			return {
				id: item.id,
				invitationAccepted: item.invitationAccepted,
				role: item.role,
				group: {
					id: item.groupId,
					groupName: item.groupName,
					groupDescription: item.groupDescription,
					groupCoverImage: item.groupCoverImage,
				},
			};
		});
	}

	async getMemberBelongToGroups(
		memberId: string,
		isMainRole: boolean,
	): Promise<BelongToGroupResDto[]> {
		return await this.repository.find({
			select: {
				id: true,
				invitationAccepted: true,
				role: true,
				group: {
					id: true,
					groupName: true,
					groupDescription: true,
					groupCoverImage: true,
				},
			},
			where: {
				memberId,
				invitationAccepted: true,
				...(isMainRole && { role: MAIN_ROLE }),
			},
			relations: {
				group: true,
			},
		});
	}

	async isMainRoleForMemberInGroup({
		groupId,
		memberId,
	}: IDeleteGroupArgs): Promise<{ role: roleType } | null> {
		const role = await this.repository.findOne({
			select: {
				role: true,
			},
			where: {
				groupId,
				memberId,
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
				memberId,
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
				groupId,
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
				groupId,
				memberId,
			},
			select: {
				id: true,
				invitationAccepted: true,
			},
		});

		return fam;
	}

	async findOrFailFamById(
		{ famId }: { famId: string },
		qr?: QueryRunner,
	): Promise<FamResDto> {
		const famsRepository = this.getFamsRepository(qr);

		const fam = await famsRepository.findOneOrFail({
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

	async createFam(
		overrideInsertFeilds: OverrideInsertFeild<FamEntity>,
		qr?: QueryRunner,
	): Promise<FamResDto> {
		const famsRepository = this.getFamsRepository(qr);

		const insertResult = await famsRepository.insert(overrideInsertFeilds);

		const id: string = insertResult.identifiers[0].id;

		return this.findOrFailFamById({ famId: id }, qr);
	}

	async updateFamInvitationAccept({
		memberId,
		famId,
		invitationAccepted,
		groupId,
	}: IUpdateFamInvitationAcceptArgs): Promise<FamResDto> {
		await this.update(
			{ id: famId, memberId, groupId },
			{ invitationAccepted: invitationAccepted },
		);

		return this.findOrFailFamById({ famId });
	}

	async deleteGroupAllMember(
		{
			groupId,
		}: {
			groupId: string;
		},
		qr?: QueryRunner,
	): Promise<boolean> {
		const famsRepository = this.getFamsRepository(qr);

		const { affected } = await famsRepository.delete({
			groupId: groupId,
		});

		return !!affected;
	}

	async deleteFam({
		famId,
		...rest
	}: {
		groupId: string;
		memberId: string;
		famId: string;
	}): Promise<boolean> {
		const { affected } = await this.delete({
			id: famId,
			...rest,
		});

		return !!affected;
	}
}
