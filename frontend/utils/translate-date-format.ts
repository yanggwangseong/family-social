import { ko } from 'date-fns/locale';
import { format } from 'date-fns';

type formatOption = {
	locale?: Locale;
	weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
	firstWeekContainsDate?: number;
	useAdditionalWeekYearTokens?: boolean;
	useAdditionalDayOfYearTokens?: boolean;
};

export const TranslateDateFormat = (
	date: Date,
	formatPattern: string,
	overrideFormatOption?: formatOption,
) => {
	return format(date, formatPattern, {
		locale: ko,
		...overrideFormatOption,
	});
};
