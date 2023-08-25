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
