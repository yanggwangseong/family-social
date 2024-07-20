import {
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
