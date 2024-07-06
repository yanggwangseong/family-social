import { LocalDateTime } from '@js-joda/core';
import { ValueTransformer } from 'typeorm';

export class LocalDateTimeTransformer implements ValueTransformer {
	from(databaseValue: Date): LocalDateTime {
		const date = LocalDateTime.FROM(databaseValue);
		return LocalDateTime(databaseValue);
	}
}
