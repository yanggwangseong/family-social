import { TourIntroductionUnionType } from '@/shared/interfaces/tour.interface';
import { isLeports } from '@/utils/type-guard';
import React, { FC } from 'react';
import AdditionalCommon from '../additional-common/AdditionalCommon';
import styles from './Leports.module.scss';
import {
	IoChevronDownOutline,
	IoChevronUp,
	IoInformationCircle,
} from 'react-icons/io5';
import { useToggleState } from '@/hooks/useToggleState';

// 레저 (28)
const TourLeports: FC<{ list: TourIntroductionUnionType }> = ({ list }) => {
	const { isToggle, setIsToggle } = useToggleState();

	return (
		<>
			{isLeports(list) && (
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
											<div className={styles.item_title}>체험가능연령</div>
											<div className={styles.item_value}>
												{item.expagerangeleports}
											</div>
											<div className={styles.item_title}>이용시간</div>
											<div className={styles.item_value}>
												{item.usetimeleports}
											</div>
										</div>
										<div className={styles.item_wrap}>
											<div className={styles.item_title}>개장기간</div>
											<div className={styles.item_value}>{item.openperiod}</div>
											<div className={styles.item_title}>쉬는날</div>
											<div className={styles.item_value}>
												{item.restdateleports}
											</div>
										</div>
										<div className={styles.item_wrap}>
											<div className={styles.item_title}>입장료</div>
											<div className={styles.item_value}>
												{item.usefeeleports}
											</div>
											<div className={styles.item_title}>문의 및 안내</div>
											<div className={styles.item_value}>
												{item.infocenterleports}
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
			<AdditionalCommon />
		</>
	);
};

export default TourLeports;
