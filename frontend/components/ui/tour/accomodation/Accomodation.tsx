import { TourIntroductionUnionType } from '@/shared/interfaces/tour.interface';
import { isAccomodation } from '@/utils/type-guard';
import React, { FC } from 'react';

const TourAccomodation: FC<{
	list: TourIntroductionUnionType[];
}> = ({ list }) => {
	return (
		<>
			{list.map(
				(item, index) =>
					isAccomodation(item) && <div key={index}>{item.contenttypeid}</div>,
			)}
		</>
	);
};

export default TourAccomodation;
