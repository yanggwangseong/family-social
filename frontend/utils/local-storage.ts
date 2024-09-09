/**
 *
 * @param key localstorage 아이템을 가져오기 위한 key
 * @returns localstorage 아이템
 */
export const getLocalStorage = (key: string) => localStorage.getItem(key);

/**
 *
 * @param key localstorage 아이템을 저장하기 위한 key
 * @param value localstorage 아이템을 저장 value 값
 * @returns void
 */
export const setLocalStorage = (key: string, value: string) =>
	localStorage.setItem(key, value);
