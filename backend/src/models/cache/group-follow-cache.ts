import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis, { ChainableCommander } from 'ioredis';

@Injectable()
export class GroupFollowCache {
	constructor(@InjectRedis() private readonly redis: Redis) {}

	private getFollowersKey(groupId: string): string {
		return `group:followers:${groupId}`;
	}

	private getFollowingKey(groupId: string): string {
		return `group:following:${groupId}`;
	}

	async addFollower(
		followedGroupId: string,
		followingGroupId: string,
		redisMulti: ChainableCommander,
	): Promise<void> {
		const followersKey = this.getFollowersKey(followedGroupId);
		const followingKey = this.getFollowingKey(followingGroupId);

		redisMulti.sadd(followersKey, followingGroupId);
		redisMulti.sadd(followingKey, followedGroupId);
	}

	async removeFollower(
		followedGroupId: string,
		followingGroupId: string,
		redisMulti: ChainableCommander,
	): Promise<void> {
		const followersKey = this.getFollowersKey(followedGroupId);
		const followingKey = this.getFollowingKey(followingGroupId);

		redisMulti.srem(followersKey, followingGroupId);
		redisMulti.srem(followingKey, followedGroupId);
	}

	async getFollowers(groupId: string): Promise<string[]> {
		return await this.redis.smembers(this.getFollowersKey(groupId));
	}

	async getFollowing(groupId: string): Promise<string[]> {
		return await this.redis.smembers(this.getFollowingKey(groupId));
	}

	async isFollowing(
		followingGroupId: string,
		followedGroupId: string,
	): Promise<boolean> {
		return (await this.redis.sismember(
			this.getFollowingKey(followingGroupId),
			followedGroupId,
		)) === 1
			? true
			: false;
	}

	async syncFollows(
		groupId: string,
		followers: string[],
		following: string[],
	): Promise<void> {
		const followersKey = this.getFollowersKey(groupId);
		const followingKey = this.getFollowingKey(groupId);

		if (followers.length > 0) await this.redis.sadd(followersKey, ...followers);

		if (following.length > 0) await this.redis.sadd(followingKey, ...following);
	}
}
