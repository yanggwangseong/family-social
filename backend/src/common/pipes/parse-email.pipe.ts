import { Injectable, PipeTransform } from '@nestjs/common';
import { z } from 'zod';

import { ERROR_EMAIL_PIPE_MESSAGE } from '@/constants/business-error';

import { BadRequestServiceException } from '../exception/service.exception';

@Injectable()
export class ParseEmailPipe implements PipeTransform {
	transform(value: string) {
		const schema = z.string().email();

		const validationResult = schema.safeParse(value);

		if (validationResult.success === false) {
			throw BadRequestServiceException(ERROR_EMAIL_PIPE_MESSAGE);
		}

		return value.toString();
	}
}
