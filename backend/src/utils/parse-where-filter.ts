import { FindOptionsWhere } from 'typeorm';

import { BadRequestServiceException } from '@/common/exception/service.exception';
import { ERROR_PARSER_FILTER_WHERE } from '@/constants/business-error';

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
		// ex) where__id = 75aca3da-1dac-48ef-84b8-cdf1be8fe37d
		/**
		 * where:{
		 * 	id : 75aca3da-1dac-48ef-84b8-cdf1be8fe37d
		 * }
		 */

		const [, field] = split;
		/**
		 * field -> 'id'
		 * value -> '75aca3da-1dac-48ef-84b8-cdf1be8fe37d'
		 */

		(options as any)[field] = value;
	}

	return options;
};
