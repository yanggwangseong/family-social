import { FindOptionsWhere } from 'typeorm';

import { BadRequestServiceException } from '@/common/exception/service.exception';
import { ERROR_PARSER_FILTER_WHERE } from '@/constants/business-error';
import { TYPEORM_FILTER_MAPPER } from '@/constants/typeorm-filter-mapper.const';

export const ParseWhereFilter = <T>(
	key: string,
	value: any,
): FindOptionsWhere<T> => {
	const options: FindOptionsWhere<T> = {};

	const split = key.split('__');

	if (split.length !== 2 && split.length !== 3) {
		throw BadRequestServiceException(`${ERROR_PARSER_FILTER_WHERE} ${key}`);
	}

	if (split.length === 2) {
		// ex) where__read = true
		/**
		 * where:{
		 * 	read : true
		 * }
		 */

		const [, field] = split;
		/**
		 * field -> 'read'
		 * value -> true
		 */

		(options as any)[field] = value;
	} else {
		// ex) where__id__more_than
		// __가 2개짜리들이 오는곳
		const [, field, operator] = split as unknown as [
			string,
			string,
			keyof typeof TYPEORM_FILTER_MAPPER,
		];

		if (operator === 'between') {
			// where_id_between = 1,2 이런식으로 쿼리가 오기 때문에 ,기준으로 배열로 split
			const values = value.toString().split(',');

			(options as any)[field] = TYPEORM_FILTER_MAPPER[operator](
				values[0],
				values[1],
			);
		} else if (operator === 'i_like') {
			(options as any)[field] = TYPEORM_FILTER_MAPPER[operator](`${value}%`);
		} else {
			// ex) where__id__more_than = 3 이렇게 특별한 조건없이 오는 조건들
			(options as any)[field] = TYPEORM_FILTER_MAPPER[operator](value);
		}
	}

	return options;
};
