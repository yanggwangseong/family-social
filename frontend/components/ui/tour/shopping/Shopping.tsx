import { TourIntroductionUnionType } from '@/shared/interfaces/tour.interface';
import { isShopping } from '@/utils/type-guard';
import React, { FC, Fragment } from 'react';
import {
	IoChevronDownOutline,
	IoChevronUp,
	IoInformationCircle,
} from 'react-icons/io5';
import styles from './Shopping.module.scss';
import AdditionalCommon from '../additional-common/AdditionalCommon';
import { useToggleState } from '@/hooks/useToggleState';

// 쇼핑 (38)
const TourShopping: FC<{ list: TourIntroductionUnionType }> = ({ list }) => {
	const { isToggle, setIsToggle } = useToggleState();

	return (
		<>
			{isShopping(list) && (
				<div className={styles.container}>
					<div className={styles.top_container}>
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
									<div className={styles.introduction_container}>
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

export default TourShopping;
