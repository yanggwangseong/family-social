import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

import {
	EntityConflictException,
	EntityNotFoundException,
	ForBiddenException,
} from '@/common/exception/service.exception';
import {
	ERROR_DELETE_GROUP,
	ERROR_DELETE_GROUP_MEMBER,
	ERROR_DELETE_GROUP_SELF_ONLY_ADMIN,
	ERROR_DUPLICATE_GROUP_NAME,
	ERROR_GROUP_NOT_FOUND,
	ERROR_NO_PERMISSION_TO_DELETE_GROUP,
	ERROR_NO_PERMISSTION_TO_GROUP,
} from '@/constants/business-error';
import { BelongToGroupResDto } from '@/models/dto/group/res/belong-to-group.res.dto';
import { GroupMembersResDto } from '@/models/dto/group/res/group-members.res.dto';
import { GroupResDto } from '@/models/dto/group/res/group-res.dto';
import { FamsRepository } from '@/models/repositories/fams.repository';
import { GroupsRepository } from '@/models/repositories/groups.repository';
import {
	ICreateGroupArgs,
	IDeleteGroupArgs,
	IMembersBelongToGroupArgs,
} from '@/types/args/group';
import { getOffset } from '@/utils/getOffset';

@Injectable()
export class GroupsService {
	constructor(
		private readonly groupsRepository: GroupsRepository,
		private readonly famsRepository: FamsRepository,
	) {}

	async getMemberListBelongToGroup({
		groupId,
		memberId,
		page,
		limit,
	}: IMembersBelongToGroupArgs): Promise<GroupMembersResDto[]> {
		// 해당 그룹에 속한지 체크
		await this.checkRoleOfGroupExists(groupId, memberId);

		const { take, skip } = getOffset({ page, limit });

		return await this.famsRepository.getMemberListBelongToGroup({
			groupId,
			take,
			skip,
		});
	}

	async getMemberBelongToGroups(
		memberId: string,
	): Promise<BelongToGroupResDto[]> {
		return await this.famsRepository.getMemberBelongToGroups(memberId);
	}

	async createGroup(
		createGroupArgs: ICreateGroupArgs,
		qr?: QueryRunner,
	): Promise<GroupResDto> {
		const { memberId, groupName, groupDescription } = createGroupArgs;

		// 중복된 그룹 이름 체크
		await this.checkDuplicateGroupName(memberId, groupName);

		const group = await this.groupsRepository.createGroup(
			{
				groupName,
				groupDescription,
			},
			qr,
		);

		await this.famsRepository.createFam(
			{
				memberId,
				groupId: group.id,
				role: 'main',
				invitationAccepted: true,
			},
			qr,
		);

		return group;
	}

	async updateGroup({
		memberId,
		...rest
	}: {
		memberId: string;
		groupId: string;
		groupName: string;
		groupDescription?: string;
	}): Promise<GroupResDto> {
		// 중복된 그룹 이름 체크
		await this.checkDuplicateGroupName(memberId, rest.groupName);

		return await this.groupsRepository.updateGroup({
			...rest,
		});
	}

	async updateGroupCoverImage(groupId: string, imageUrl: string) {
		return await this.groupsRepository.updateGroupCoverImage(groupId, imageUrl);
	}

	async deleteGroup(
		deleteGroupArgs: IDeleteGroupArgs,
		qr?: QueryRunner,
	): Promise<void> {
		const { groupId, memberId } = deleteGroupArgs;

		const role = await this.checkRoleOfGroupExists(groupId, memberId);
		// 해당 그룹의 권한이 main인지 체크
		if (role.role !== 'main') {
			throw ForBiddenException(ERROR_NO_PERMISSION_TO_DELETE_GROUP);
		}

		const count = await this.famsRepository.getMemberGroupCountByGroupId({
			groupId,
		});

		// 그룹 구성원이 main 1명일때만 삭제 가능.
		if (count !== 1) {
			throw ForBiddenException(ERROR_DELETE_GROUP_SELF_ONLY_ADMIN);
		}

		const [GroupMemberStatus, GroupStatus] = await Promise.all([
			await this.famsRepository.deleteGroupAllMember(
				{
					groupId,
				},
				qr,
			),
			await this.groupsRepository.deleteGroup(
				{
					groupId,
				},
				qr,
			),
		]);

		if (!GroupMemberStatus)
			throw EntityConflictException(ERROR_DELETE_GROUP_MEMBER);

		if (!GroupStatus) throw EntityConflictException(ERROR_DELETE_GROUP);
	}

	private async checkDuplicateGroupName(
		memberId: string,
		groupName: string,
	): Promise<void> {
		const count = await this.groupsRepository.findGroupByGroupName({
			memberId,
			groupName,
		});

		if (count > 0) {
			throw EntityConflictException(ERROR_DUPLICATE_GROUP_NAME);
		}
	}

	async checkRoleOfGroupExists(groupId: string, memberId: string) {
		const role = await this.famsRepository.isMainRoleForMemberInGroup({
			groupId,
			memberId,
		});

		// 해당 그룹에 로그인한 유저가 속하는 사람인지 체크
		if (!role) {
			throw ForBiddenException(ERROR_NO_PERMISSTION_TO_GROUP);
		}

		return role;
	}

	async memberShipOfGroupExists(
		groupId: string,
		memberId: string,
	): Promise<boolean> {
		return await this.famsRepository.exist({
			where: {
				groupId,
				memberId,
				invitationAccepted: true,
			},
		});
	}

	async findGroupByIdOrThrow(groupId: string): Promise<GroupResDto> {
		const group = await this.groupsRepository.findGroupById({
			groupId,
		});

		if (!group) {
			throw EntityNotFoundException(ERROR_GROUP_NOT_FOUND);
		}

		return group;
	}

	async groupExistsByGroupId(groupId: string) {
		return this.groupsRepository.exist({ where: { id: groupId } });
	}
}
