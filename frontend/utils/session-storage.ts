/**
 *
 * @param key SessionStorage 아이템을 가져오기 위한 key
 * @returns SessionStorage 아이템
 */
export const getSessionStorage = (key: string) => sessionStorage.getItem(key);

/**
 *
 * @param key SessionStorage 아이템을 저장을 위한 key
 * @param value SessionStorage 아이템을 저장 값
 * @returns void
 */
export const setSessionStorage = (key: string, value: string) =>
	sessionStorage.setItem(key, value);
