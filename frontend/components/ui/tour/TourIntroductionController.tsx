import React, { FC } from 'react';
import IntroductionTourist from './introduction/tourist/IntroductionTourist';
import { TourIntroductionUnionType } from '@/shared/interfaces/tour.interface';
import IntroductionCultural from './introduction/cultural/IntroductionCultural';
import { Union } from 'types';
import IntroductionFestival from './introduction/festival/IntroductionFestival';
import IntroductionTourCourse from './introduction/tour-course/TourCourse';
import IntroductionLeports from './introduction/leports/IntroductionLeports';
import IntroductionAccomodation from './introduction/accomodation/IntroductionAccomodation';
import IntroductionShopping from './introduction/shopping/IntroductionShopping';
import IntroductionRestaurant from './introduction/restaurant/IntroductionRestaurant';

const LayerMode = {
	tourist: 'tourist',
	cultural: 'cultural',
	festival: 'festival',
	tourCourse: 'tourCourse',
	leports: 'leports',
	accomodation: 'accomodation',
	shopping: 'shopping',
	restaurant: 'restaurant',
} as const;

const StatusLookUpTable = {
	[LayerMode.tourist]: IntroductionTourist,
	[LayerMode.cultural]: IntroductionCultural,
	[LayerMode.festival]: IntroductionFestival,
	[LayerMode.tourCourse]: IntroductionTourCourse,
	[LayerMode.leports]: IntroductionLeports,
	[LayerMode.accomodation]: IntroductionAccomodation,
	[LayerMode.shopping]: IntroductionShopping,
	[LayerMode.restaurant]: IntroductionRestaurant,
};

interface StatusProps {
	status: Union<typeof LayerMode>;
	list: TourIntroductionUnionType[];
}

const TourIntroductionController: FC<StatusProps> = ({ status, list }) => {
	const Component = StatusLookUpTable[status];

	if (Component) {
		return <Component list={list} />;
	}

	return <div>오류가 발생했습니다. 고객센터로 문의 바랍니다.</div>;
};

export default TourIntroductionController;
