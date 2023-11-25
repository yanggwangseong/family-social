export const getDateRange = (startDate: string, endDate: string): string[] => {
	const dates = [];
	const start = new Date(startDate);
	const end = new Date(endDate);

	for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
		dates.push(new Date(date).toISOString().split('T')[0]);
	}

	return dates;
};
