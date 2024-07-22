import { useToggleState } from '@/hooks/useToggleState';
import { TourIntroductionUnionType } from '@/shared/interfaces/tour.interface';
import { isAccomodation } from '@/utils/type-guard';
import React, { FC } from 'react';
import AdditionalAccomodation from '../additional-accomodation/AdditionalAccomodation';
import styles from './Accomodation.module.scss';
import {
	IoChevronDownOutline,
	IoChevronUp,
	IoInformationCircle,
} from 'react-icons/io5';

// 숙박 (32)
const TourAccomodation: FC<{
	list: TourIntroductionUnionType;
}> = ({ list }) => {
	const { isToggle, setIsToggle } = useToggleState();

	return (
		<>
			{isAccomodation(list) && (
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
								<>
									<div className={styles.introduction_container} key={index}>
										<div className={styles.item_wrap}>
											<div className={styles.item_title}>입실시간</div>
											<div className={styles.item_value}>
												{item.checkintime}
											</div>
											<div className={styles.item_title}>퇴실시간</div>
											<div className={styles.item_value}>
												{item.checkouttime}
											</div>
										</div>
										<div className={styles.item_wrap}>
											<div className={styles.item_title}>객실내취사여부</div>
											<div className={styles.item_value}>{item.chkcooking}</div>
											<div className={styles.item_title}>베니키아여부</div>
											<div className={styles.item_value}>{item.benikia}</div>
										</div>
										<div className={styles.item_wrap}>
											<div className={styles.item_title}>바비큐장여부</div>
											<div className={styles.item_value}>{item.barbecue}</div>
											<div className={styles.item_title}>주차시설</div>
											<div className={styles.item_value}>
												{item.parkinglodging}
											</div>
										</div>
										<div className={styles.item_wrap}>
											<div className={styles.item_title}>예약안내홈페이지</div>
											<div className={styles.item_value}>
												{item.reservationurl}
											</div>
											<div className={styles.item_title}>문의 및 안내</div>
											<div className={styles.item_value}>
												{item.infocenterlodging}
											</div>
										</div>
									</div>
								</>
							))}
						</>
					)}
				</div>
			)}

			{/* additional */}
			<AdditionalAccomodation />
		</>
	);
};

export default TourAccomodation;
