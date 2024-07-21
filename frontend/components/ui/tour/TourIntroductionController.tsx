import React, { FC } from 'react';
import Tourist from './tourist/Tourist';
import { TourIntroductionUnionType } from '@/shared/interfaces/tour.interface';
import TourCultural from './cultural/Cultural';
import { Union } from 'types';
import TourFestival from './festival/Festival';
import TourCourse from './tour-course/TourCourse';
import TourLeports from './leports/Leports';
import Accomodation from './accomodation/Accomodation';
import Restaurant from './restaurant/Restaurant';
import TourShopping from './shopping/Shopping';

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
	[LayerMode.tourist]: Tourist,
	[LayerMode.cultural]: TourCultural,
	[LayerMode.festival]: TourFestival,
	[LayerMode.tourCourse]: TourCourse,
	[LayerMode.leports]: TourLeports,
	[LayerMode.accomodation]: Accomodation,
	[LayerMode.shopping]: TourShopping,
	[LayerMode.restaurant]: Restaurant,
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
