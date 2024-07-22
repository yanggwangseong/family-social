import { useTourAdditionalExplanation } from '@/hooks/useTourAdditionalExplanation';
import { TourIntroductionUnionType } from '@/shared/interfaces/tour.interface';
import { isAccomodation, isAdditionalAccomodation } from '@/utils/type-guard';
import React, { FC } from 'react';

// 숙박 (32)
const TourAccomodation: FC<{
	list: TourIntroductionUnionType;
}> = ({ list }) => {
	const { data } = useTourAdditionalExplanation();

	return (
		<>
			{isAccomodation(list) &&
				list.list.map((item, index) => (
					<div key={index}>{item.accomcountlodging}</div>
				))}

			{data &&
				isAdditionalAccomodation(data) &&
				data.list.length > 0 &&
				data.list.map((item, index) => <div key={index}>{item.roomcount}</div>)}
		</>
	);
};

export default TourAccomodation;
