export function generateRandomCode(length: number): string {
	const ALPHANUMERIC: string =
		'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

	let i: number = 0;
	let code: string = '';
	const charactersLength: number = ALPHANUMERIC.length;
	while (i < length) {
		const randomIndex: number = Math.floor(Math.random() * charactersLength);
		code += ALPHANUMERIC.charAt(randomIndex);
		i++;
	}

	return code;
}
