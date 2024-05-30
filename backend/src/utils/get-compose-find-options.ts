import { FindManyOptions, FindOptionsOrder, FindOptionsWhere } from 'typeorm';

import { DefaultPaginationReqDto } from '@/models/dto/pagination/req/default-pagination-req.dto';

import { ParseWhereFilter } from './parse-where-filter';

/**
 * @example { where__id__more_than: 1, order__createdAt: 'ASC' }
 *
 * @param dto
 * @returns where
 * @returns order
 * @returns take
 * @returns skip basic pagination 일때
 *
 */
export const getComposeFindOptions = <T>(
	dto: DefaultPaginationReqDto,
): FindManyOptions<T> => {
	let where: FindOptionsWhere<T> = {};
	const order: FindOptionsOrder<T> = {};

	for (const [key, value] of Object.entries(dto)) {
		if (key.startsWith('where__')) {
			where = {
				...ParseWhereFilter(key, value),
			};
		}
	}

	return {
		where,
		order,
	};
};
