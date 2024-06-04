import { FindOptionsOrder } from 'typeorm';

import { BadRequestServiceException } from '@/common/exception/service.exception';
import { ERROR_PARSER_FILTER_ORDER } from '@/constants/business-error';

export const ParserOrderFilter = <T>(
	key: string,
	value: any,
): FindOptionsOrder<T> => {
	const order: FindOptionsOrder<T> = {};

	/**
	 * order는 무조건 두개로 스플릿된다.
	 */
	const split = key.split('__');

	if (split.length !== 2) {
		throw BadRequestServiceException(`${ERROR_PARSER_FILTER_ORDER} ${key}`);
	}

	const [, field] = split;

	(order as any)[field] = value;

	return order;
};
