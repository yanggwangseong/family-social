import React, { FC, useReducer } from 'react';
import styles from './Tourist.module.scss';
import { TourIntroductionUnionType } from '@/shared/interfaces/tour.interface';
import { isAdditionalCommon, isTourist } from '@/utils/type-guard';
import {
	IoChevronDownOutline,
	IoChevronUp,
	IoInformationCircle,
} from 'react-icons/io5';
import { useTourAdditionalExplanation } from '@/hooks/useTourAdditionalExplanation';
import { useIntroductionAndAdditional } from '@/hooks/useIntroductionAndAdditional';

// 관광지조회 (12)
const Tourist: FC<{ list: TourIntroductionUnionType }> = ({ list }) => {
	const { data } = useTourAdditionalExplanation();

	const { isIntroduction, setIsIntroduction, isAdditional, setIsAdditional } =
		useIntroductionAndAdditional();

	return (
		<>
			{isTourist(list) && (
				<div className={styles.tourist_container}>
					<div className={styles.tourist_top_container}>
						<div>
							<IoInformationCircle size={18} color="#0a0a0a" />
						</div>
						<div className={styles.title}>소개 정보:</div>
						<div className={styles.btn_container} onClick={setIsIntroduction}>
							{isIntroduction ? (
								<IoChevronUp size={18} color="#0a0a0a" />
							) : (
								<IoChevronDownOutline size={18} color="#0a0a0a" />
							)}
						</div>
					</div>
					{isIntroduction && (
						<>
							{list.list.map((item, index) => (
								<>
									<div
										className={styles.tourist_introduction_container}
										key={index}
									>
										<div className={styles.item_wrap}>
											<div className={styles.item_title}>이용시간</div>
											<div className={styles.item_value}>{item.usetime}</div>
											<div className={styles.item_title}>쉬는날</div>
											<div className={styles.item_value}>{item.restdate}</div>
										</div>
										<div className={styles.item_wrap}>
											<div className={styles.item_title}>개장일</div>
											<div className={styles.item_value}>{item.opendate}</div>
											<div className={styles.item_title}>문의 및 안내</div>
											<div className={styles.item_value}>{item.infocenter}</div>
										</div>
									</div>
								</>
							))}
						</>
					)}
				</div>
			)}

			{data && isAdditionalCommon(data) && data.list.length > 0 && (
				<div className={styles.tourist_additional_container}>
					<div className={styles.title_container}>
						<div>
							<IoInformationCircle size={18} color="#0a0a0a" />
						</div>
						<div className={styles.title}>추가 정보:</div>
						<div className={styles.btn_container} onClick={setIsAdditional}>
							{isAdditional ? (
								<IoChevronUp size={18} color="#0a0a0a" />
							) : (
								<IoChevronDownOutline size={18} color="#0a0a0a" />
							)}
						</div>
					</div>
					{isAdditional && (
						<>
							{data.list.map((data, index) => (
								<div className={styles.item_wrap} key={index}>
									<div className={styles.item_title}>{data.infoname}</div>
									<div className={styles.item_value}>{data.infotext}</div>
								</div>
							))}
						</>
					)}
				</div>
			)}
		</>
	);
};

export default Tourist;
