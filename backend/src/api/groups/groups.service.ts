import { Injectable, OnModuleInit } from '@nestjs/common';
import { Not, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { QueryRunnerWithRedis } from '@/common/decorators/query-runner-with-redis.decorator';
import {
	EntityConflictException,
	EntityNotFoundException,
	ForBiddenException,
} from '@/common/exception/service.exception';
import {
	ERROR_DELETE_GROUP,
	ERROR_DELETE_GROUP_MEMBER,
	ERROR_DELETE_GROUP_SELF_ONLY_ADMIN,
	ERROR_GROUP_NOT_FOUND,
	ERROR_NO_PERMISSION_TO_DELETE_GROUP,
	ERROR_NO_PERMISSTION_TO_GROUP,
} from '@/constants/business-error';
import { MAIN_ROLE } from '@/constants/string-constants';
import { GroupFollowCache } from '@/models/cache/group-follow-cache';
import { BelongToGroupResDto } from '@/models/dto/group/res/belong-to-group.res.dto';
import { GroupMembersResDto } from '@/models/dto/group/res/group-members.res.dto';
import { GroupProfileResDto } from '@/models/dto/group/res/group-profile.rest.dto';
import { GroupResDto } from '@/models/dto/group/res/group-res.dto';
import { FamsRepository } from '@/models/repositories/fams.repository';
import { GroupFollowRepository } from '@/models/repositories/group-follow.repository';
import { GroupsRepository } from '@/models/repositories/groups.repository';
import {
	ICreateGroupArgs,
	IDeleteGroupArgs,
	IMembersBelongToGroupArgs,
	IUpdateGroupArgs,
} from '@/types/args/group';
import { getOffset } from '@/utils/getOffset';

@Injectable()
export class GroupsService implements OnModuleInit {
	constructor(
		private readonly groupsRepository: GroupsRepository,
		private readonly famsRepository: FamsRepository,
		private readonly groupFollowCache: GroupFollowCache,
		private readonly groupFollowRepository: GroupFollowRepository,
	) {}

	/**
	 * 서버 시작 시 모든 그룹의 팔로우를 Redis와 동기화 (Cache Warming)
	 */
	async onModuleInit() {
		const groupIds = await this.groupsRepository.findAllGroupIds();
		for (const groupId of groupIds) {
			const [followers, following] = await Promise.all([
				this.groupFollowRepository.getFollowers(groupId),
				this.groupFollowRepository.getFollowings(groupId),
			]);

			await this.groupFollowCache.syncFollows(
				groupId,
				followers.map((data) => data.followingGroupId),
				following.map((data) => data.followedGroupId),
			);
		}
	}

	/**
	 * 레디스에서 해당 그룹을 팔로우하는 그룹들을 가져온다.
	 */
	async getFollowers(groupId: string) {
		return await this.groupFollowCache.getFollowers(groupId);
	}

	/**
	 * 레디스에서 해당 그룹을 팔로우하는 그룹들을 가져온다.
	 */
	async getFollowings(groupId: string) {
		return await this.groupFollowCache.getFollowing(groupId);
	}

	async followGroup(
		followingGroupId: string,
		followedGroupId: string,
		qrAndRedis: QueryRunnerWithRedis,
	) {
		const { queryRunner, redisMulti } = qrAndRedis;
		const isFollowing = await this.groupFollowCache.isFollowing(
			followingGroupId,
			followedGroupId,
		);

		if (isFollowing) {
			await this.groupFollowCache.removeFollower(
				followedGroupId,
				followingGroupId,
				redisMulti,
			);
			await this.groupFollowRepository.removeFollow(
				followingGroupId,
				followedGroupId,
				queryRunner,
			);
		} else {
			await this.groupFollowCache.addFollower(
				followedGroupId,
				followingGroupId,
				redisMulti,
			);
			await this.groupFollowRepository.addFollow(
				followingGroupId,
				followedGroupId,
				queryRunner,
			);
		}

		return !isFollowing;
	}

	async getMemberListBelongToGroup({
		groupId,
		memberId,
		page,
		limit,
		excludeSelf,
	}: IMembersBelongToGroupArgs): Promise<GroupMembersResDto[]> {
		// 해당 그룹에 속한지 체크
		await this.checkRoleOfGroupExists(groupId, memberId);

		const { take, skip } = getOffset({ page, limit });

		if (excludeSelf) {
			return await this.famsRepository.getMemberListBelongToGroup({
				take,
				skip,
				overrideWhere: {
					groupId,
					member: {
						id: Not(memberId),
					},
					invitationAccepted: true,
				},
			});
		}

		return await this.famsRepository.getMemberListBelongToGroup({
			take,
			skip,
			overrideWhere: {
				groupId,
				invitationAccepted: true,
			},
		});
	}

	async getMemberBelongToGroups(
		memberId: string,
		forChatCreation: boolean,
	): Promise<BelongToGroupResDto[]> {
		if (forChatCreation) {
			return await this.famsRepository.getMemberBelongToGroupsForChatCreation(
				memberId,
			);
		}

		return await this.famsRepository.getMemberBelongToGroups(memberId);
	}

	async createGroup(
		createGroupArgs: ICreateGroupArgs,
		qr?: QueryRunner,
	): Promise<GroupResDto> {
		const { memberId, groupName, groupDescription } = createGroupArgs;

		const newGroup = this.groupsRepository.create({
			id: uuidv4(),
			groupName,
			groupDescription,
		});

		const group = await this.groupsRepository.createGroup(newGroup, qr);

		const newFam = this.famsRepository.create({
			id: uuidv4(),
			memberId,
			groupId: group.id,
			role: MAIN_ROLE,
			invitationAccepted: true,
		});

		await this.famsRepository.createFam(newFam, qr);

		return group;
	}

	async updateGroup(updateGroupArgs: IUpdateGroupArgs): Promise<GroupResDto> {
		return await this.groupsRepository.updateGroup({
			...updateGroupArgs,
		});
	}

	async updateGroupCoverImage(groupId: string, imageUrl: string) {
		return await this.groupsRepository.updateGroupCoverImage(groupId, imageUrl);
	}

	async checkMainRole(groupId: string, memberId: string): Promise<void> {
		const role = await this.checkRoleOfGroupExists(groupId, memberId);
		// 해당 그룹의 권한이 main인지 체크
		if (role.role !== MAIN_ROLE) {
			throw ForBiddenException(ERROR_NO_PERMISSION_TO_DELETE_GROUP);
		}
	}

	async deleteGroup(
		deleteGroupArgs: IDeleteGroupArgs,
		qr?: QueryRunner,
	): Promise<void> {
		const { groupId, memberId } = deleteGroupArgs;

		/**
		 *  그룹 권한 main인지 체크
		 */
		await this.checkMainRole(groupId, memberId);

		const count = await this.famsRepository.getMemberGroupCountByGroupId({
			groupId,
		});

		// 그룹 구성원이 main 1명일때만 삭제 가능.
		if (count !== 1) {
			throw ForBiddenException(ERROR_DELETE_GROUP_SELF_ONLY_ADMIN);
		}

		const GroupMemberStatus = await this.famsRepository.deleteGroupAllMember(
			{
				groupId,
			},
			qr,
		);

		const GroupStatus = await this.groupsRepository.deleteGroup(
			{
				groupId,
			},
			qr,
		);

		if (!GroupMemberStatus)
			throw EntityConflictException(ERROR_DELETE_GROUP_MEMBER);

		if (!GroupStatus) throw EntityConflictException(ERROR_DELETE_GROUP);
	}

	async checkDuplicateGroupName(memberId: string, groupName: string) {
		return this.groupsRepository.findGroupByGroupName({
			memberId,
			groupName,
		});
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

	async findGroupByIdOrThrow(groupId: string): Promise<GroupProfileResDto> {
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
