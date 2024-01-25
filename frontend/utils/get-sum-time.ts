export const getSumTime = (
	startTime: string,
	endTime: string,
): string | null => {
	// 정규식을 사용하여 유효한 시간 형식인지 확인
	const timePattern = /^(?:0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
	if (!timePattern.test(startTime) || !timePattern.test(endTime)) {
		return null; // 잘못된 형식의 경우 null 반환
	}

	// 시작 시간과 종료 시간을 분 단위로 변환
	const [startHour, startMinute] = startTime.split(':').map(Number);
	const [endHour, endMinute] = endTime.split(':').map(Number);

	// 시작 시간과 종료 시간을 분으로 변환하여 차이 계산
	const startTotalMinutes = startHour * 60 + startMinute;
	const endTotalMinutes = endHour * 60 + endMinute;
	let diffMinutes = endTotalMinutes - startTotalMinutes;

	// 음수인 경우 24시간을 더해주어야 함
	if (diffMinutes < 0) {
		diffMinutes += 24 * 60;
	}

	// 결과를 "HH:mm" 형식으로 포맷팅
	const resultHour = Math.floor(diffMinutes / 60);
	const resultMinute = diffMinutes % 60;

	return `${resultHour}시간 ${resultMinute}분`;
};
