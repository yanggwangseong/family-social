import '@js-joda/timezone';
import { Duration, Instant, ZonedDateTime, ZoneId } from '@js-joda/core';
import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

import { SearchType, Union } from '@/types';

@Injectable()
export class SearchService {
	private readonly SEARCH_HISTORY_KEY = 'search:history';
	private readonly MAX_HISTORY_SIZE = 10;
	private readonly MIN_TERM_LENGTH = 2;
	private readonly MIN_SEARCH_INTERVAL = 1000; // 1초

	constructor(@InjectRedis() private readonly redis: Redis) {}

	async addSearchTerm(
		userId: string,
		term: string,
		searchType: Union<typeof SearchType>,
	): Promise<void> {
		if (term.length < this.MIN_TERM_LENGTH) {
			return;
		}

		const key = `${this.SEARCH_HISTORY_KEY}:${searchType}:${userId}`;
		const now = ZonedDateTime.now(ZoneId.of('Asia/Seoul'));
		const timestamp = now.toEpochSecond();

		const lastSearch = await this.redis.zrange(key, -1, -1, 'WITHSCORES');
		if (lastSearch.length > 0) {
			const [lastTerm, lastTimestampEpoch] = lastSearch;
			const lastTimestamp = ZonedDateTime.ofInstant(
				Instant.ofEpochSecond(parseInt(lastTimestampEpoch)),
				ZoneId.of('Asia/Seoul'),
			);

			const timeDifference = Duration.between(lastTimestamp, now).toMillis();

			if (lastTerm === term || timeDifference < this.MIN_SEARCH_INTERVAL) {
				return;
			}
		}

		// Redis에 Epoch 타임스탬프로 검색어와 시간을 저장
		await this.redis.zadd(key, timestamp, term);

		// 검색어가 10개를 초과하면 가장 오래된 검색어 삭제
		const count = await this.redis.zcard(key);
		if (count > this.MAX_HISTORY_SIZE) {
			await this.redis.zremrangebyrank(
				key,
				0,
				count - this.MAX_HISTORY_SIZE - 1,
			);
		}
	}

	async getRecentSearchTerms(
		userId: string,
		searchType: Union<typeof SearchType>,
	): Promise<string[]> {
		const key = `${this.SEARCH_HISTORY_KEY}:${searchType}:${userId}`;
		return await this.redis.zrevrange(key, 0, this.MAX_HISTORY_SIZE - 1);
	}

	async clearSearchHistory(
		userId: string,
		searchType: Union<typeof SearchType>,
	): Promise<void> {
		const key = `${this.SEARCH_HISTORY_KEY}:${searchType}:${userId}`;
		await this.redis.del(key);
	}

	async deleteSearchTerm(
		userId: string,
		searchType: Union<typeof SearchType>,
		term: string,
	): Promise<void> {
		const key = `${this.SEARCH_HISTORY_KEY}:${searchType}:${userId}`;
		await this.redis.zrem(key, term);
	}
}
