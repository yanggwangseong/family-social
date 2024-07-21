import { TourIntroductionUnionType } from '@/shared/interfaces/tour.interface';
import { isCultural } from '@/utils/type-guard';
import React, { FC } from 'react';

const TourCultural: FC<{ list: TourIntroductionUnionType[] }> = ({ list }) => {
	return (
		<>
			{list.map(
				(item, index) =>
					isCultural(item) && <div key={index}>{item.contenttypeid}</div>,
			)}
		</>
	);
};

export default TourCultural;
