import { useIntroductionAndAdditional } from '@/hooks/useIntroductionAndAdditional';
import { useTourAdditionalExplanation } from '@/hooks/useTourAdditionalExplanation';
import { TourIntroductionUnionType } from '@/shared/interfaces/tour.interface';
import { isAdditionalCommon, isShopping } from '@/utils/type-guard';
import React, { FC } from 'react';
import {
	IoChevronDownOutline,
	IoChevronUp,
	IoInformationCircle,
} from 'react-icons/io5';
import styles from './Shopping.module.scss';

// 쇼핑 (38)
const TourShopping: FC<{ list: TourIntroductionUnionType }> = ({ list }) => {
	const { data } = useTourAdditionalExplanation();

	const { isIntroduction, setIsIntroduction, isAdditional, setIsAdditional } =
		useIntroductionAndAdditional();

	return (
		<>
			{isShopping(list) && (
				<div className={styles.container}>
					<div className={styles.top_container}>
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
									<div className={styles.introduction_container} key={index}>
										<div className={styles.item_wrap}>
											<div className={styles.item_title}>개장일</div>
											<div className={styles.item_value}>
												{item.opendateshopping}
											</div>
											<div className={styles.item_title}>쉬는날</div>
											<div className={styles.item_value}>
												{item.restdateshopping}
											</div>
										</div>
										<div className={styles.item_wrap}>
											<div className={styles.item_title}>영업 시간</div>
											<div className={styles.item_value}>{item.opentime}</div>
											<div className={styles.item_title}>문의 및 안내</div>
											<div className={styles.item_value}>
												{item.infocentershopping}
											</div>
										</div>
									</div>
								</>
							))}
						</>
					)}
				</div>
			)}

			{data && isAdditionalCommon(data) && data.list.length > 0 && (
				<div className={styles.additional_container}>
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
								<>
									<div className={styles.item_wrap} key={index}>
										<div className={styles.item_title}>{data.infoname}</div>
										<div className={styles.item_value}>{data.infotext}</div>
									</div>
								</>
							))}
						</>
					)}
				</div>
			)}
		</>
	);
};

export default TourShopping;
