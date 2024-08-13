import { getHours, getMinutes } from 'date-fns';

/**
 *
 * @param time 분 시간
 * @returns 분 시간을 시간 분으로 변환
 */
export const calculateTime = (time: Date) => {
	const hours = getHours(time);
	const minutes = getMinutes(time);

	return hours * 60 + minutes;
};
