import { ConfigService } from '@nestjs/config';
import {
	FindManyOptions,
	ObjectLiteral,
	Repository,
	SelectQueryBuilder,
} from 'typeorm';

import { ENV_HOST_KEY, ENV_PROTOCOL_KEY } from '@/constants/env-keys.const';
import { DefaultPaginationReqDto } from '@/models/dto/pagination/req/default-pagination-req.dto';
import { getComposeFindOptions } from '@/utils/get-compose-find-options';

import { PaginationStrategy } from './context/pagination';

export class CursorPaginationStrategy<T extends ObjectLiteral>
	implements PaginationStrategy<T>
{
	constructor(private readonly configService: ConfigService) {}

	async paginate(
		dto: DefaultPaginationReqDto,
		repository: Repository<T>,
		overrideFindOptions: FindManyOptions<T> = {},
		path: string,
	) {
		const findOptions = this.composeFindOptions<T>(dto);

		const { where, order, ...rest } = overrideFindOptions;

		findOptions.where = {
			...findOptions.where,
			...where,
		};

		findOptions.order = {
			...findOptions.order!,
			...order,
		};

		const results = await repository.find({
			...findOptions,
			...rest,
		});

		// 해당되는 데이터가 0개 이상이면
		// 마지막 데이터를 가져오고
		// 아니면 null을 반환한다.
		const lastItem =
			results.length > 0 && results.length === dto.limit
				? results[results.length - 1]
				: null;

		const protocol = this.configService.get<string>(ENV_PROTOCOL_KEY);
		const host = this.configService.get<string>(ENV_HOST_KEY);

		const nextUrl = lastItem && new URL(`${protocol}://${host}/${path}`);

		if (nextUrl) {
			for (const key of Object.keys(dto)) {
				const property = (dto as any)[key];
				if (property) {
					if (
						key !== `where__id__more_than` &&
						key !== `where__id__less_than`
					) {
						nextUrl.searchParams.append(key, property);
					}
				}
			}

			let key = null;

			if (dto.order__createdAt === 'ASC') {
				key = 'where__id__more_than';
			} else {
				key = 'where__id__less_than';
			}

			nextUrl.searchParams.append(key, lastItem.id.toString());
		}

		return {
			list: results,
			lastItem: lastItem,
			nextUrl: nextUrl,
		};
	}

	async paginateQueryBuilder(
		dto: DefaultPaginationReqDto,
		query: SelectQueryBuilder<T>,
		path: string,
	) {
		const results = await query.getRawMany();

		const lastItem =
			results.length > 0 && results.length === dto.limit
				? results[results.length - 1]
				: null;

		const protocol = this.configService.get<string>(ENV_PROTOCOL_KEY);
		const host = this.configService.get<string>(ENV_HOST_KEY);

		const nextUrl = lastItem && new URL(`${protocol}://${host}/${path}`);

		return {
			list: results,
			lastItem: lastItem,
			nextUrl: nextUrl,
		};
	}

	private composeFindOptions<T>(
		dto: DefaultPaginationReqDto,
	): FindManyOptions<T> {
		return getComposeFindOptions<T>(dto);
	}
}
