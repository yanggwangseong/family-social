import { Injectable, PipeTransform } from '@nestjs/common';
import { z } from 'zod';

import { BadRequestServiceException } from '../exception/service.exception';

@Injectable()
export class ParseEmailPipe implements PipeTransform {
	transform(value: string) {
		const schema = z.string().email();

		const validationResult = schema.safeParse(value);

		if (validationResult.success === false) {
			throw BadRequestServiceException('이메일 형식이 올바르지 않습니다');
		}

		return value.toString();
	}
}
