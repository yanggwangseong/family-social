import { useTourAdditionalExplanation } from '@/hooks/useTourAdditionalExplanation';
import { TourIntroductionUnionType } from '@/shared/interfaces/tour.interface';
import { isAdditionalCommon, isCultural } from '@/utils/type-guard';
import React, { FC } from 'react';

// 문화시설 (14)
const TourCultural: FC<{ list: TourIntroductionUnionType }> = ({ list }) => {
	const { data } = useTourAdditionalExplanation();

	return (
		<>
			{isCultural(list) &&
				list.list.map((item, index) => (
					<div key={index}>{item.chkcreditcardculture}</div>
				))}

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
