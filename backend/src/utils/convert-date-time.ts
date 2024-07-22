import { convert, LocalDateTime, nativeJs } from '@js-joda/core';

export const ConverDateTime = {
	toDate(value: LocalDateTime) {
		return convert(value).toDate();
	},

	toLocalDateTime(databaseValue: Date) {
		return nativeJs(databaseValue).toLocalDateTime();
	},
};
