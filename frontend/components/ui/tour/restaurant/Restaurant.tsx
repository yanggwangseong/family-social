import { useTourAdditionalExplanation } from '@/hooks/useTourAdditionalExplanation';
import { TourIntroductionUnionType } from '@/shared/interfaces/tour.interface';
import { isAdditionalCommon, isRestaurant } from '@/utils/type-guard';
import React, { FC } from 'react';

// 음식점 (39)
const TourRestaurant: FC<{
	list: TourIntroductionUnionType[];
}> = ({ list }) => {
	const { data } = useTourAdditionalExplanation();

	return (
		<>
			{list.map(
				(item, index) =>
					isRestaurant(item) && <div key={index}>{item.contenttypeid}</div>,
			)}

			{data &&
				data.length > 0 &&
				data.map(
					(item, index) =>
						isAdditionalCommon(item) && (
							<div key={index}>{item.contenttypeid}</div>
						),
				)}
		</>
	);
};

export default TourRestaurant;
