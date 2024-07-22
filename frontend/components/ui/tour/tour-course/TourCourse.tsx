import { useTourAdditionalExplanation } from '@/hooks/useTourAdditionalExplanation';
import { TourIntroductionUnionType } from '@/shared/interfaces/tour.interface';
import { isAdditionalTourCourse, isTourCourse } from '@/utils/type-guard';
import React, { FC } from 'react';

// 여행코스 (25)
const TourCourse: FC<{ list: TourIntroductionUnionType }> = ({ list }) => {
	const { data } = useTourAdditionalExplanation();

	return (
		<>
			{isTourCourse(list) &&
				list.list.map((item, index) => <div key={index}>{item.schedule}</div>)}

			{data &&
				isAdditionalTourCourse(data) &&
				data.list.length > 0 &&
				data.list.map((item, index) => <div key={index}>{item.subname}</div>)}
		</>
	);
};

export default TourCourse;
