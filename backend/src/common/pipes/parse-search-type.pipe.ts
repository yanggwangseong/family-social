import { PipeTransform } from '@nestjs/common';
import { z } from 'zod';

import { ERROR_SEARCH_TYPE_PIPE_MESSAGE } from '@/constants/business-error';
import { SearchType, Union } from '@/types';

import { BadRequestServiceException } from '../exception/service.exception';

export class ParseSearchTypePipe implements PipeTransform {
	transform(value: Union<typeof SearchType>) {
		const schema = z.enum(SearchType);

		const validationResult = schema.safeParse(value);

		if (validationResult.success === false) {
			throw BadRequestServiceException(
				ERROR_SEARCH_TYPE_PIPE_MESSAGE + `(${SearchType.join(',')})`,
			);
		}

		return value;
	}
}
