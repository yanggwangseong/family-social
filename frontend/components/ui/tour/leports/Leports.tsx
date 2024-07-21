import { TourIntroductionUnionType } from '@/shared/interfaces/tour.interface';
import { isLeports } from '@/utils/type-guard';
import React, { FC } from 'react';

const TourLeports: FC<{ list: TourIntroductionUnionType[] }> = ({ list }) => {
	return (
		<>
			{list.map(
				(item, index) =>
					isLeports(item) && <div key={index}>{item.contenttypeid}</div>,
			)}
		</>
	);
};

export default TourLeports;
