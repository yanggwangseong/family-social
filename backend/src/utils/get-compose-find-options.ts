import { FindManyOptions, FindOptionsOrder, FindOptionsWhere } from 'typeorm';

import { DefaultPaginationReqDto } from '@/models/dto/pagination/req/default-pagination-req.dto';

import { ParseWhereFilter } from './parse-where-filter';
import { ParserOrderFilter } from './parser-order-filter';

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
	let order: FindOptionsOrder<T> = {};

	for (const [key, value] of Object.entries(dto)) {
		if (key.startsWith('where__')) {
			where = {
				...where,
				...ParseWhereFilter(key, value),
			};
		} else if (key.startsWith('order__')) {
			order = {
				...order,
				...ParserOrderFilter(key, value),
			};
		}
	}

	return {
		where,
		order,
	};
};
