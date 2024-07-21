import { TourIntroductionUnionType } from '@/shared/interfaces/tour.interface';
import { isShopping } from '@/utils/type-guard';
import React, { FC } from 'react';

const TourShopping: FC<{ list: TourIntroductionUnionType[] }> = ({ list }) => {
	return (
		<>
			{list.map(
				(item, index) =>
					isShopping(item) && <div key={index}>{item.contenttypeid}</div>,
			)}
		</>
	);
};

export default TourShopping;
