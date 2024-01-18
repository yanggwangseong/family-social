export const getTransTime = (time: string) => {
	if (time.length === 2) {
		const timeArray = time.split('');
		if (timeArray[0] === '0') return timeArray[1];
		else return time;
	}
};
