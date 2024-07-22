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

export const TourLayerMode = {
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
	[TourLayerMode.tourist]: Tourist,
	[TourLayerMode.cultural]: TourCultural,
	[TourLayerMode.festival]: TourFestival,
	[TourLayerMode.tourCourse]: TourCourse,
	[TourLayerMode.leports]: TourLeports,
	[TourLayerMode.accomodation]: Accomodation,
	[TourLayerMode.shopping]: TourShopping,
	[TourLayerMode.restaurant]: Restaurant,
};

interface StatusProps {
	status: Union<typeof TourLayerMode>;
	list: TourIntroductionUnionType;
}

const TourIntroductionController: FC<StatusProps> = ({ status, list }) => {
	const Component = StatusLookUpTable[status];

	if (Component) {
		return <Component list={list} />;
	}

	return <div>오류가 발생했습니다. 고객센터로 문의 바랍니다.</div>;
};

export default TourIntroductionController;
