/**
 * 쿠키에 저장된 key값에 해당하는 value 값을 가져옵니다.
 * @param key
 * @returns { string | undefined } cookie 값
 */
export const getCookie = (key: string) => {
	const matches = document.cookie.match(
		new RegExp(`(?:^|; )${key.replace(/([.$?*|{}()[]\/+^])/g, '$1')}=([^;]*)`),
	);

	return matches ? decodeURIComponent(matches[1]) : undefined;
};

/**
 * 쿠키에 key와 value를 설정합니다.
 * @param {string} key - 쿠키의 키
 * @param {string} value - 쿠키의 값
 * @param {number} days - 쿠키 유효 기간 (일 수)
 */
export const setCookie = (key: string, value: string, days: number) => {
	const date = new Date();
	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // 유효 기간 계산
	const expires = `expires=${date.toUTCString()}`;
	document.cookie = `${key}=${value}; ${expires}; path=/`;
};
