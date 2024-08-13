export const stringToTime = (timeString: string): Date => {
	// 현재 날짜를 가져오고 시간을 설정합니다
	const currentDate = new Date();
	const [hours, minutes] = timeString.split(':').map(Number);

	currentDate.setHours(hours);
	currentDate.setMinutes(minutes);
	currentDate.setSeconds(0);
	currentDate.setMilliseconds(0);

	return currentDate;
};
