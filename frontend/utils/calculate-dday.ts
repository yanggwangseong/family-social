import { differenceInDays } from 'date-fns';

export const calculateDDay = (targetDate: string): string => {
	const today = new Date();
	const eventDate = new Date(targetDate);

	const diffDays = differenceInDays(eventDate, today);

	if (diffDays < 0) {
		return '종료';
	} else if (diffDays === 0) {
		return 'D-Day';
	} else {
		return `D-${diffDays}`;
	}
};
