import { useTourAdditionalExplanation } from '@/hooks/useTourAdditionalExplanation';
import { TourIntroductionUnionType } from '@/shared/interfaces/tour.interface';
import { isAdditionalCommon, isCultural } from '@/utils/type-guard';
import React, { FC } from 'react';

// 문화시설 (14)
const TourCultural: FC<{ list: TourIntroductionUnionType[] }> = ({ list }) => {
	const { data } = useTourAdditionalExplanation();

	return (
		<>
			{list.map(
				(item, index) =>
					isCultural(item) && <div key={index}>{item.contenttypeid}</div>,
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

export default TourCultural;
