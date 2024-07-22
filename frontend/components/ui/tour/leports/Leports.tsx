import { useTourAdditionalExplanation } from '@/hooks/useTourAdditionalExplanation';
import { TourIntroductionUnionType } from '@/shared/interfaces/tour.interface';
import { isAdditionalCommon, isLeports } from '@/utils/type-guard';
import React, { FC } from 'react';

// 레저 (28)
const TourLeports: FC<{ list: TourIntroductionUnionType }> = ({ list }) => {
	const { data } = useTourAdditionalExplanation();

	return (
		<>
			{isLeports(list) &&
				list.list.map((item, index) => (
					<div key={index}>{item.chkpetleports}</div>
				))}

			{data &&
				isAdditionalCommon(data) &&
				data.list.length > 0 &&
				data.list.map((item, index) => <div key={index}>{item.infoname}</div>)}
		</>
	);
};

export default TourLeports;
