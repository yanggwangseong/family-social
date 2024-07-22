import React, { FC } from 'react';
import styles from './IntroductionTourist.module.scss';
import { TourIntroductionUnionType } from '@/shared/interfaces/tour.interface';
import { isAdditionalCommon, isTourist } from '@/utils/type-guard';
import { useTourAdditionalExplanation } from '@/hooks/useTourAdditionalExplanation';

// 관광지조회 (12)
const Tourist: FC<{ list: TourIntroductionUnionType }> = ({ list }) => {
	const { data } = useTourAdditionalExplanation();

	return (
		<>
			{isTourist(list) &&
				list.list.map((item, index) => (
					<div key={index}>{item.chkbabycarriage}</div>
				))}
			{data &&
				data.length > 0 &&
				data.map(
					(item, index) =>
						isAdditionalCommon(item) && <div key={index}>{`456456`}</div>,
				)}
		</>
	);
};

export default Tourist;
