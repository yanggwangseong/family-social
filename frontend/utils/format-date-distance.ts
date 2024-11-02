import { formatDistanceToNow, format, isAfter, subDays } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * 날짜를 상대적 시간으로 표시합니다.
 * @param date 날짜
 * @returns 상대적 시간
 */
export const formatDateDistance = (date: string) => {
	const targetDate = new Date(date);
	const now = new Date();
	const thirtyDaysAgo = subDays(now, 30);

	// 30일이 지났으면 전체 날짜 표시
	if (isAfter(thirtyDaysAgo, targetDate)) {
		return format(targetDate, 'yyyy년 MM월 dd일', { locale: ko });
	}

	// 30일 이내면 상대적 시간 표시
	return formatDistanceToNow(targetDate, {
		addSuffix: true,
		locale: ko,
	});
};
