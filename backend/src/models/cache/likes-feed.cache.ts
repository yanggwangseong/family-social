import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class LikesFeedCache {
	constructor(@InjectRedis() private readonly redis: Redis) {}

	async addLike(memberId: string, feedId: string): Promise<void> {
		const key = `feed:likes:${feedId}`;
		await this.redis.sadd(key, memberId);
	}

	async removeLike(memberId: string, feedId: string): Promise<void> {
		const key = `feed:likes:${feedId}`;
		await this.redis.srem(key, memberId);
	}

	async hasLiked(memberId: string, feedId: string): Promise<boolean> {
		const key = `feed:likes:${feedId}`;
		return (await this.redis.sismember(key, memberId)) === 1 ? true : false;
	}

	async getLikeCount(feedId: string): Promise<number> {
		const key = `feed:likes:${feedId}`;
		return await this.redis.scard(key);
	}

	async syncLikes(feedId: string, memberIds: string[]): Promise<void> {
		const key = `feed:likes:${feedId}`;
		if (memberIds.length > 0) {
			await this.redis.sadd(key, ...memberIds);
		}
	}
}
