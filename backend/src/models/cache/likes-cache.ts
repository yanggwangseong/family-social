import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis, { ChainableCommander } from 'ioredis';

import { LikeCacheType, Union } from '@/types';

@Injectable()
export class LikesCache {
	constructor(@InjectRedis() private readonly redis: Redis) {}

	private getKey(
		likeCacheType: Union<typeof LikeCacheType>,
		id: string,
	): string {
		return `${likeCacheType}:likes:${id}`;
	}

	async addLike(
		likeCacheType: Union<typeof LikeCacheType>,
		memberId: string,
		id: string,
		redisMulti: ChainableCommander,
	): Promise<void> {
		const key = this.getKey(likeCacheType, id);
		redisMulti.sadd(key, memberId);
	}

	async removeLike(
		likeCacheType: Union<typeof LikeCacheType>,
		memberId: string,
		id: string,
		redisMulti: ChainableCommander,
	): Promise<void> {
		const key = this.getKey(likeCacheType, id);
		redisMulti.srem(key, memberId);
	}

	async hasLiked(
		likeCacheType: Union<typeof LikeCacheType>,
		memberId: string,
		id: string,
	): Promise<boolean> {
		const key = this.getKey(likeCacheType, id);
		return (await this.redis.sismember(key, memberId)) === 1 ? true : false;
	}

	async getLikeCount(
		likeCacheType: Union<typeof LikeCacheType>,
		id: string,
	): Promise<number> {
		const key = this.getKey(likeCacheType, id);
		return await this.redis.scard(key);
	}

	async syncLikes(
		likeCacheType: Union<typeof LikeCacheType>,
		id: string,
		memberIds: string[],
	): Promise<void> {
		const key = this.getKey(likeCacheType, id);
		if (memberIds.length > 0) await this.redis.sadd(key, ...memberIds);
	}

	async setLikeCount(type: string, id: string, count: number): Promise<void> {
		await this.redis.set(`${type}:count:${id}`, count.toString());
	}

	async setUserLike(
		type: string,
		userId: string,
		id: string,
		hasLiked: boolean,
	): Promise<void> {
		if (hasLiked) {
			await this.redis.sadd(`${type}:${id}`, userId);
		} else {
			await this.redis.srem(`${type}:${id}`, userId);
		}
	}
}
