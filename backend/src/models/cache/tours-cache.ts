import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

import { BasicPaginationResponse } from '@/types/pagination';

import { TourHttpAreaCodeResDto } from '../dto/tour/res/tour-http-area-code-res.dto';
import { TourHttpServiceCategoryResDto } from '../dto/tour/res/tour-http-service-category-res.dto';

@Injectable()
export class ToursCache {
	private readonly CACHE_TTL = 86400; // 24 hours in seconds

	constructor(@InjectRedis() private readonly redis: Redis) {}

	async getAreaCodesCache(
		key: string,
	): Promise<BasicPaginationResponse<TourHttpAreaCodeResDto> | null> {
		const cachedData = await this.redis.get(key);
		return cachedData ? JSON.parse(cachedData) : null;
	}

	async setAreaCodesCache(
		key: string,
		data: BasicPaginationResponse<TourHttpAreaCodeResDto>,
	): Promise<void> {
		await this.redis.set(key, JSON.stringify(data), 'EX', this.CACHE_TTL);
	}
}
