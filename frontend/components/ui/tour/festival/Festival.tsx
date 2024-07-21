import React, { FC } from 'react';
import styles from './introductionFestival.module.scss';
import { TourIntroductionUnionType } from '@/shared/interfaces/tour.interface';
import { isFestival } from '@/utils/type-guard';

const TourFestival: FC<{ list: TourIntroductionUnionType[] }> = ({ list }) => {
	return (
		<>
			{list.map(
				(item, index) =>
					isFestival(item) && <div key={index}>{item.contenttypeid}</div>,
			)}
		</>
	);
};

export default TourFestival;
