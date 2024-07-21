import { useTourAdditionalExplanation } from '@/hooks/useTourAdditionalExplanation';
import { TourIntroductionUnionType } from '@/shared/interfaces/tour.interface';
import { isAccomodation, isAdditionalAccomodation } from '@/utils/type-guard';
import React, { FC } from 'react';

// 숙박 (32)
const TourAccomodation: FC<{
	list: TourIntroductionUnionType[];
}> = ({ list }) => {
	const { data } = useTourAdditionalExplanation();

	return (
		<>
			{list.map(
				(item, index) =>
					isAccomodation(item) && <div key={index}>{item.contenttypeid}</div>,
			)}

			{data &&
				data.length > 0 &&
				data.map(
					(item, index) =>
						isAdditionalAccomodation(item) && (
							<div key={index}>{item.contenttypeid}</div>
						),
				)}
		</>
	);
};

export default TourAccomodation;
