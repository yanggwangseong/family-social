import {
	Repository,
	FindManyOptions,
	ObjectLiteral,
	SelectQueryBuilder,
} from 'typeorm';

import { DefaultPaginationReqDto } from '@/models/dto/pagination/req/default-pagination-req.dto';
import { getComposeFindOptions } from '@/utils/get-compose-find-options';

import { PaginationStrategy } from './context/pagination';

export class BasicPaginationStrategy<T extends ObjectLiteral>
	implements PaginationStrategy<T>
{
	async paginate(
		dto: DefaultPaginationReqDto,
		repository: Repository<T>,
		overrideFindOptions: FindManyOptions<T> = {},
	) {
		/**
		 *  composeFindOptions에서 보통 where절과 order by절을 생성 하여 findOptions에 담긴다.
		 * 	order절도 만약 overrideFindOptions에서 추가 했다면 하나로 합쳐주는 작업
		 */
		const findOptions = this.composeFindOptions<T>(dto);

		const { where, order, ...rest } = overrideFindOptions;

		/**
		 *  만약에 overrideFindOptions에서도 where절을 추가 했다면
		 *  아래의 로직처럼 2개의 where절을 하나로 합쳐주는 작업
		 */
		findOptions.where = {
			...findOptions.where,
			...where,
		};

		// order절도 만약 overrideFindOptions에서 추가 했다면 하나로 합쳐주는 작업
		findOptions.order = {
			...findOptions.order!,
			...order,
		};

		const [list, count] = await repository.findAndCount({
			...findOptions,
			...rest,
		});

		return {
			list,
			count,
		};
	}

	async paginateQueryBuilder(
		dto: DefaultPaginationReqDto,
		query: SelectQueryBuilder<T>,
	) {
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
		return getComposeFindOptions(dto);
	}
}
