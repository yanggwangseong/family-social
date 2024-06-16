export const FormatDateToString = (dateString: string): Date => {
	const [y, m, d] = dateString.split('-');

	return new Date(`${parseInt(y)}-${parseInt(m)}-${parseInt(d)}`);
};
