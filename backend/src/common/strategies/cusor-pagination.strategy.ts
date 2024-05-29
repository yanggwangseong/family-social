import {
	FindManyOptions,
	ObjectLiteral,
	Repository,
	SelectQueryBuilder,
} from 'typeorm';

import { DefaultPaginationReqDto } from '@/models/dto/pagination/req/default-pagination-req.dto';

import { PaginationStrategy } from './context/pagination';

export class CursorPaginationStrategy<T extends ObjectLiteral>
	implements PaginationStrategy<T>
{
	async paginate(
		dto: DefaultPaginationReqDto,
		repository: Repository<T>,
		overrideFindOptions: FindManyOptions<T> = {},
		path?: string,
	) {
		const [data, count] = await repository.findAndCount({
			...overrideFindOptions,
		});

		return {
			data,
			count,
		};
	}

	async paginateQueryBuilder(query: SelectQueryBuilder<T>, path?: string) {
		const [list, count] = await Promise.all([
			query.getRawMany(),
			query.getCount(),
		]);

		return {
			list,
			count,
		};
	}
}
