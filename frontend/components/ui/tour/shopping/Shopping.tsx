import { useTourAdditionalExplanation } from '@/hooks/useTourAdditionalExplanation';
import { TourIntroductionUnionType } from '@/shared/interfaces/tour.interface';
import { isAdditionalCommon, isShopping } from '@/utils/type-guard';
import React, { FC } from 'react';

// 쇼핑 (38)
const TourShopping: FC<{ list: TourIntroductionUnionType[] }> = ({ list }) => {
	const { data } = useTourAdditionalExplanation();

	return (
		<>
			{list.map(
				(item, index) =>
					isShopping(item) && <div key={index}>{item.contenttypeid}</div>,
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

export default TourShopping;
