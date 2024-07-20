import React, { FC } from 'react';
import styles from './IntroductionTourist.module.scss';
import { TourIntroductionUnionType } from '@/shared/interfaces/tour.interface';
import { isTourist } from '@/utils/type-guard';

const IntroductionTourist: FC<{ list: TourIntroductionUnionType[] }> = ({
	list,
}) => {
	return (
		<>
			{list.map(
				(item, index) =>
					isTourist(item) && <div key={index}>{item.contenttypeid}</div>,
			)}
		</>
	);
};

export default IntroductionTourist;
