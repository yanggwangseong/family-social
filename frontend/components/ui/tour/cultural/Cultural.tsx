import { TourIntroductionUnionType } from '@/shared/interfaces/tour.interface';
import { isCultural } from '@/utils/type-guard';
import React, { FC } from 'react';
import AdditionalCommon from '../additional-common/AdditionalCommon';
import styles from './Cultural.module.scss';
import {
	IoChevronDownOutline,
	IoChevronUp,
	IoInformationCircle,
} from 'react-icons/io5';
import { useToggleState } from '@/hooks/useToggleState';

// 문화시설 (14)
const TourCultural: FC<{ list: TourIntroductionUnionType }> = ({ list }) => {
	const { isToggle, setIsToggle } = useToggleState();

	return (
		<>
			{isCultural(list) && (
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
											<div className={styles.item_title}>이용 요금</div>
											<div className={styles.item_value}>{item.usefee}</div>
											<div className={styles.item_title}>이용 시간</div>
											<div className={styles.item_value}>
												{item.usetimeculture}
											</div>
										</div>
										<div className={styles.item_wrap}>
											<div className={styles.item_title}>쉬는날</div>
											<div className={styles.item_value}>
												{item.restdateculture}
											</div>
											<div className={styles.item_title}>문의 및 안내</div>
											<div className={styles.item_value}>
												{item.infocenterculture}
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

export default TourCultural;
