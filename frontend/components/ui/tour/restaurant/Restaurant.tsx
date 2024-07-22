import { useTourAdditionalExplanation } from '@/hooks/useTourAdditionalExplanation';
import { TourIntroductionUnionType } from '@/shared/interfaces/tour.interface';
import { isAdditionalCommon, isRestaurant } from '@/utils/type-guard';
import React, { FC } from 'react';

// 음식점 (39)
const TourRestaurant: FC<{
	list: TourIntroductionUnionType;
}> = ({ list }) => {
	const { data } = useTourAdditionalExplanation();

	return (
		<>
			{isRestaurant(list) &&
				list.list.map((item, index) => <div key={index}>{item.firstmenu}</div>)}

			{data &&
				isAdditionalCommon(data) &&
				data.list.length > 0 &&
				data.list.map((item, index) => <div key={index}>{item.infoname}</div>)}
		</>
	);
};

export default TourRestaurant;
