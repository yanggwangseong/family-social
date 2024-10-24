import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { z } from 'zod';

import { ERROR_NOT_DEFINED_METADATA_DATA } from '@/constants/business-error';

import { InternalServerErrorException } from '../exception/service.exception';
import { parseIntWithRangePipeMessage } from '../pipe-message/parse-int-with-range-pipe-message';

@Injectable()
export class ParseIntWithRangePipe implements PipeTransform {
	constructor(
		private min: number,
		private max: number,
	) {}
	transform(value: string, metadata: ArgumentMetadata) {
		const metadataData = metadata.data;
		const parsedValue = parseInt(value.toString());

		if (!metadataData) {
			throw InternalServerErrorException(ERROR_NOT_DEFINED_METADATA_DATA);
		}

		if (parsedValue < this.min || parsedValue > this.max) {
			const schema = z.number().min(this.min).max(this.max);

			const validationResult = schema.safeParse(parsedValue);

			if (validationResult.success === false) {
				parseIntWithRangePipeMessage(metadata.data, this.min, this.max);
			}
		}

		return value;
	}
}
