export const extractFilePathFromUrl = (url: string, dir: string) => {
	const feedIndex = url.indexOf(dir);

	// dir가 없거나 인덱스가 0보다 작은 경우 경로를 추출할 수 없습니다.
	if (feedIndex === -1 || feedIndex < 0) {
		return null;
	}

	// dir 이후의 문자열을 추출합니다.
	const filePath = url.slice(feedIndex);

	return filePath;
};
