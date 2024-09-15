export const isEmptyObject = <T extends object>(input: T) =>
	Object.keys(input).length === 0;
