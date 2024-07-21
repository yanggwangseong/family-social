import { TourIntroductionUnionType } from '@/shared/interfaces/tour.interface';
import { isRestaurant } from '@/utils/type-guard';
import React, { FC } from 'react';

const TourRestaurant: FC<{
	list: TourIntroductionUnionType[];
}> = ({ list }) => {
	return (
		<>
			{list.map(
				(item, index) =>
					isRestaurant(item) && <div key={index}>{item.contenttypeid}</div>,
			)}
		</>
	);
};

export default TourRestaurant;
