import { LocalDateTime } from '@js-joda/core';
import { ValueTransformer } from 'typeorm';

import { ConverDateTime } from '@/utils/convert-date-time';

export class LocalDateTimeTransformer implements ValueTransformer {
	to(value: LocalDateTime) {
		return ConverDateTime.toDate(value);
	}

	from(databaseValue: Date): LocalDateTime {
		return ConverDateTime.toLocalDateTime(databaseValue);
	}
}
