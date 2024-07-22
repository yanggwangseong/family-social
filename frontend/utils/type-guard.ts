import {
	TourAdditionalAccomodation,
	TourAdditionalCommon,
	TourAdditionalTourCourse,
	TourAdditionalUnionType,
	TourAdditionalUnionTypeResponse,
	TourIntroductionAccomodation,
	TourIntroductionCultural,
	TourIntroductionFestival,
	TourIntroductionLeports,
	TourIntroductionRestaurant,
	TourIntroductionShopping,
	TourIntroductionTourCourse,
	TourIntroductionTourist,
	TourIntroductionUnionType,
	TourIntroductionUnionTypeResponse,
} from '@/shared/interfaces/tour.interface';

export const isTourist = (
	data: TourIntroductionUnionType,
): data is TourIntroductionUnionTypeResponse<TourIntroductionTourist> => {
	return data.kind === 'tourist';
};

export const isCultural = (
	data: TourIntroductionUnionType,
): data is TourIntroductionUnionTypeResponse<TourIntroductionCultural> => {
	return data.kind === 'cultural';
};

export const isFestival = (
	data: TourIntroductionUnionType,
): data is TourIntroductionUnionTypeResponse<TourIntroductionFestival> => {
	return data.kind === 'festival';
};

export const isTourCourse = (
	data: TourIntroductionUnionType,
): data is TourIntroductionUnionTypeResponse<TourIntroductionTourCourse> => {
	return data.kind === 'tourCourse';
};

export const isLeports = (
	data: TourIntroductionUnionType,
): data is TourIntroductionUnionTypeResponse<TourIntroductionLeports> => {
	return data.kind === 'leports';
};

export const isAccomodation = (
	data: TourIntroductionUnionType,
): data is TourIntroductionUnionTypeResponse<TourIntroductionAccomodation> => {
	return data.kind === 'accomodation';
};

export const isShopping = (
	data: TourIntroductionUnionType,
): data is TourIntroductionUnionTypeResponse<TourIntroductionShopping> => {
	return data.kind === 'shopping';
};

export const isRestaurant = (
	data: TourIntroductionUnionType,
): data is TourIntroductionUnionTypeResponse<TourIntroductionRestaurant> => {
	return data.kind === 'restaurant';
};

/**
 * 반복 추가 정보 공통조회 (12, 14, 15, 28, 38, 39) 타입 가드
 * @param data 반복 정보 유니온 타입
 * @returns {TourAdditionalCommon} 공통조회 인터페이스 타입 가드
 */
export const isAdditionalCommon = (
	data: TourAdditionalUnionType,
): data is TourAdditionalUnionTypeResponse<TourAdditionalCommon> => {
	return data.kind === 'additionalCommon';
};

/**
 * 반복 추가 정보 여행코스조회 (25) 타입 가드
 * @param data 반복 정보 유니온 타입
 * @returns {TourAdditionalTourCourse} 여행코스조회 인터페이스 타입 가드
 */
export const isAdditionalTourCourse = (
	data: TourAdditionalUnionType,
): data is TourAdditionalUnionTypeResponse<TourAdditionalTourCourse> => {
	return data.kind === 'additionalTourCourse';
};

/**
 * 반복 추가 정보 숙박조회 (32) 타입 가드
 * @param data 반복 정보 유니온 타입
 * @returns {TourAdditionalAccomodation} 숙박조회 인터페이스 타입 가드
 */
export const isAdditionalAccomodation = (
	data: TourAdditionalUnionType,
): data is TourAdditionalUnionTypeResponse<TourAdditionalAccomodation> => {
	return data.kind === 'additionalAccomodation';
};
