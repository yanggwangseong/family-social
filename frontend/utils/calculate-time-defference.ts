import { differenceInMinutes } from 'date-fns';
/**
 *
 * @param startTime 시작 시간
 * @param endTime  종료 시간
 * @returns 시작 시간과 종료 시간의 차이를 분으로 변환
 */
export const calculateTimeDifference = (
	startTime: Date,
	endTime: Date,
): number => {
	return differenceInMinutes(endTime, startTime);
};
