import { Injectable, OnModuleInit } from '@nestjs/common';

import { QueryRunnerWithRedis } from '@/common/decorators/query-runner-with-redis.decorator';
import { GroupFollowCache } from '@/models/cache/group-follow-cache';
import { GroupFollowRepository } from '@/models/repositories/group-follow.repository';
import { GroupsRepository } from '@/models/repositories/groups.repository';

@Injectable()
export class GroupFollowService implements OnModuleInit {
	constructor(
		private readonly groupsRepository: GroupsRepository,
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
}
