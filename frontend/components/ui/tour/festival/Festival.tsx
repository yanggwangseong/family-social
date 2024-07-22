import React, { FC } from 'react';
import styles from './introductionFestival.module.scss';
import { TourIntroductionUnionType } from '@/shared/interfaces/tour.interface';
import { isAdditionalCommon, isFestival } from '@/utils/type-guard';
import { useTourAdditionalExplanation } from '@/hooks/useTourAdditionalExplanation';

// 축제공연행사 (15)
const TourFestival: FC<{ list: TourIntroductionUnionType }> = ({ list }) => {
	const { data } = useTourAdditionalExplanation();

	return (
		<>
			{isFestival(list) &&
				list.list.map((item, index) => (
					<div key={index}>{item.bookingplace}</div>
				))}

			{data &&
				isAdditionalCommon(data) &&
				data.list.length > 0 &&
				data.list.map((item, index) => <div key={index}>{item.infoname}</div>)}
		</>
	);
};

export default TourFestival;
