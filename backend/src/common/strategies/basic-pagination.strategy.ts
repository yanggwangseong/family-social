import {
	Repository,
	FindManyOptions,
	ObjectLiteral,
	SelectQueryBuilder,
	FindOptionsWhere,
} from 'typeorm';

import { DefaultPaginationReqDto } from '@/models/dto/pagination/req/default-pagination-req.dto';

import { PaginationStrategy } from './context/pagination';

export class BasicPaginationStrategy<T extends ObjectLiteral>
	implements PaginationStrategy<T>
{
	async paginate(
		dto: DefaultPaginationReqDto,
		repository: Repository<T>,
		overrideFindOptions: FindManyOptions<T> = {},
	) {
		const findOptions = this.composeFindOptions<T>(dto);

		const [list, count] = await repository.findAndCount({
			...findOptions,
			...overrideFindOptions,
		});

		return {
			list,
			count,
		};
	}

	async paginateQueryBuilder(query: SelectQueryBuilder<T>) {
		const [list, count] = await Promise.all([
			query.getRawMany(),
			query.getCount(),
		]);

		return {
			list,
			count,
		};
	}

	private composeFindOptions<T>(
		dto: DefaultPaginationReqDto,
	): FindManyOptions<T> {
		const where: FindOptionsWhere<T> = {};

		return {
			where,
		};
	}
}
