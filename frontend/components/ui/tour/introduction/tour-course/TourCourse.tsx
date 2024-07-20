import { TourIntroductionUnionType } from '@/shared/interfaces/tour.interface';
import { isTourCourse } from '@/utils/type-guard';
import React, { FC } from 'react';

const IntroductionTourCourse: FC<{ list: TourIntroductionUnionType[] }> = ({
	list,
}) => {
	return (
		<>
			{list.map(
				(item, index) =>
					isTourCourse(item) && <div key={index}>{item.contenttypeid}</div>,
			)}
		</>
	);
};

export default IntroductionTourCourse;
