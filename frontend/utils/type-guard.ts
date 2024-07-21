import {
	TourAdditionalAccomodation,
	TourAdditionalCommon,
	TourAdditionalTourCourse,
	TourAdditionalUnionType,
	TourIntroductionAccomodation,
	TourIntroductionCultural,
	TourIntroductionFestival,
	TourIntroductionLeports,
	TourIntroductionRestaurant,
	TourIntroductionShopping,
	TourIntroductionTourCourse,
	TourIntroductionTourist,
	TourIntroductionUnionType,
} from '@/shared/interfaces/tour.interface';

export const isTourist = (
	data: TourIntroductionUnionType,
): data is TourIntroductionTourist => {
	return data.kind === 'tourist';
};

export const isCultural = (
	data: TourIntroductionUnionType,
): data is TourIntroductionCultural => {
	return data.kind === 'cultural';
};

export const isFestival = (
	data: TourIntroductionUnionType,
): data is TourIntroductionFestival => {
	return data.kind === 'festival';
};

export const isTourCourse = (
	data: TourIntroductionUnionType,
): data is TourIntroductionTourCourse => {
	return data.kind === 'tourCourse';
};

export const isLeports = (
	data: TourIntroductionUnionType,
): data is TourIntroductionLeports => {
	return data.kind === 'leports';
};

export const isAccomodation = (
	data: TourIntroductionUnionType,
): data is TourIntroductionAccomodation => {
	return data.kind === 'accomodation';
};

export const isShopping = (
	data: TourIntroductionUnionType,
): data is TourIntroductionShopping => {
	return data.kind === 'shopping';
};

export const isRestaurant = (
	data: TourIntroductionUnionType,
): data is TourIntroductionRestaurant => {
	return data.kind === 'restaurant';
};

/**
 * 반복 추가 정보 공통조회 (12, 14, 15, 28, 38, 39) 타입 가드
 * @param data 반복 정보 유니온 타입
 * @returns {TourAdditionalCommon} 공통조회 인터페이스 타입 가드
 */
export const isAdditionalCommon = (
	data: TourAdditionalUnionType,
): data is TourAdditionalCommon => {
	return data.kind === 'additionalCommon';
};

/**
 * 반복 추가 정보 여행코스조회 (25) 타입 가드
 * @param data 반복 정보 유니온 타입
 * @returns {TourAdditionalTourCourse} 여행코스조회 인터페이스 타입 가드
 */
export const isAdditionalTourCourse = (
	data: TourAdditionalUnionType,
): data is TourAdditionalTourCourse => {
	return data.kind === 'additionalTourCourse';
};

/**
 * 반복 추가 정보 숙박조회 (32) 타입 가드
 * @param data 반복 정보 유니온 타입
 * @returns {TourAdditionalAccomodation} 숙박조회 인터페이스 타입 가드
 */
export const isAdditionalAccomodation = (
	data: TourAdditionalUnionType,
): data is TourAdditionalAccomodation => {
	return data.kind === 'additionalAccomodation';
};
