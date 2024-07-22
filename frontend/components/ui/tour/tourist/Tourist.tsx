import React, { FC, Fragment, useReducer } from 'react';
import styles from './Tourist.module.scss';
import { TourIntroductionUnionType } from '@/shared/interfaces/tour.interface';
import { isTourist } from '@/utils/type-guard';
import {
	IoChevronDownOutline,
	IoChevronUp,
	IoInformationCircle,
} from 'react-icons/io5';
import { useToggleState } from '@/hooks/useToggleState';
import AdditionalCommon from '../additional-common/AdditionalCommon';

// 관광지조회 (12)
const Tourist: FC<{ list: TourIntroductionUnionType }> = ({ list }) => {
	const { isToggle, setIsToggle } = useToggleState();

	return (
		<>
			{isTourist(list) && (
				<div className={styles.tourist_container}>
					<div className={styles.tourist_top_container}>
						<div>
							<IoInformationCircle size={18} color="#0a0a0a" />
						</div>
						<div className={styles.title}>소개 정보:</div>
						<div className={styles.btn_container} onClick={setIsToggle}>
							{isToggle ? (
								<IoChevronUp size={18} color="#0a0a0a" />
							) : (
								<IoChevronDownOutline size={18} color="#0a0a0a" />
							)}
						</div>
					</div>
					{isToggle && (
						<>
							{list.list.map((item, index) => (
								<Fragment key={index}>
									<div className={styles.tourist_introduction_container}>
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
								</Fragment>
							))}
						</>
					)}
				</div>
			)}

			{/* additional */}
			<AdditionalCommon />
		</>
	);
};

export default Tourist;
