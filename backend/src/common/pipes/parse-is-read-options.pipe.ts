import { Injectable, PipeTransform } from '@nestjs/common';
import { z } from 'zod';

import { ERROR_IS_READ_OPTIONS_PIPE_MESSAGE } from '@/constants/business-error';
import { Union, isReadOptions } from '@/types';

import { BadRequestServiceException } from '../exception/service.exception';

@Injectable()
export class ParseIsReadOptionsPipe implements PipeTransform {
	transform(value: Union<typeof isReadOptions>) {
		const schema = z.enum(isReadOptions);

		const validationResult = schema.safeParse(value);

		if (validationResult.success === false) {
			throw BadRequestServiceException(
				ERROR_IS_READ_OPTIONS_PIPE_MESSAGE + `(${isReadOptions.join(',')})`,
			);
		}

		return value;
	}
}
