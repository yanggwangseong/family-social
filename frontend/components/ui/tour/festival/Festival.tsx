import React, { FC, Fragment } from 'react';
import styles from './Festival.module.scss';
import { TourIntroductionUnionType } from '@/shared/interfaces/tour.interface';
import { isFestival } from '@/utils/type-guard';
import AdditionalCommon from '../additional-common/AdditionalCommon';
import { useToggleState } from '@/hooks/useToggleState';
import {
	IoChevronDownOutline,
	IoChevronUp,
	IoInformationCircle,
} from 'react-icons/io5';

// 축제공연행사 (15)
const TourFestival: FC<{ list: TourIntroductionUnionType }> = ({ list }) => {
	const { isToggle, setIsToggle } = useToggleState();

	return (
		<>
			{isFestival(list) && (
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
											<div className={styles.item_title}>행사 시작일</div>
											<div className={styles.item_value}>
												{item.eventstartdate}
											</div>
											<div className={styles.item_title}>행사 종료일</div>
											<div className={styles.item_value}>
												{item.eventenddate}
											</div>
										</div>
										<div className={styles.item_wrap}>
											<div className={styles.item_title}>행사 장소</div>
											<div className={styles.item_value}>{item.eventplace}</div>
											<div className={styles.item_title}>행사 홈페이지</div>
											<div className={styles.item_value}>
												{item.eventhomepage}
											</div>
										</div>
										<div className={styles.item_wrap}>
											<div className={styles.item_title}>공연시간</div>
											<div className={styles.item_value}>{item.playtime}</div>
											<div className={styles.item_title}>이용요금</div>
											<div className={styles.item_value}>
												{item.usetimefestival}
											</div>
										</div>
										<div className={styles.item_wrap}>
											<div className={styles.item_title}>주최자 연락처</div>
											<div className={styles.item_value}>
												{item.sponsor1tel}
											</div>
											<div className={styles.item_title}>주관사 연락처</div>
											<div className={styles.item_value}>
												{item.sponsor2tel}
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

export default TourFestival;
