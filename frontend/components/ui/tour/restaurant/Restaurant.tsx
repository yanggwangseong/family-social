import { TourIntroductionUnionType } from '@/shared/interfaces/tour.interface';
import { isRestaurant } from '@/utils/type-guard';
import React, { FC, Fragment } from 'react';
import {
	IoChevronDownOutline,
	IoChevronUp,
	IoInformationCircle,
} from 'react-icons/io5';
import styles from './Restaurant.module.scss';
import { useToggleState } from '@/hooks/useToggleState';
import AdditionalCommon from '../additional-common/AdditionalCommon';

// 음식점 (39)
const TourRestaurant: FC<{
	list: TourIntroductionUnionType;
}> = ({ list }) => {
	const { isToggle, setIsToggle } = useToggleState();

	return (
		<>
			{isRestaurant(list) && (
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
											<div className={styles.item_title}>대표메뉴</div>
											<div className={styles.item_value}>{item.firstmenu}</div>
											<div className={styles.item_title}>주차시설</div>
											<div className={styles.item_value}>
												{item.parkingfood}
											</div>
										</div>
										<div className={styles.item_wrap}>
											<div className={styles.item_title}>영업 시간</div>
											<div className={styles.item_value}>
												{item.opentimefood}
											</div>
											<div className={styles.item_title}>문의 및 안내</div>
											<div className={styles.item_value}>
												{item.infocenterfood}
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

export default TourRestaurant;
