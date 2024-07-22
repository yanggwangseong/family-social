import { TourIntroductionUnionType } from '@/shared/interfaces/tour.interface';
import { isTourCourse } from '@/utils/type-guard';
import React, { FC } from 'react';
import {
	IoChevronDownOutline,
	IoChevronUp,
	IoInformationCircle,
} from 'react-icons/io5';
import styles from './TourCourse.module.scss';
import { useToggleState } from '@/hooks/useToggleState';
import AdditionalTourCourse from '../additional-tour-course/AdditionalTourCourse';

// 여행코스 (25)
const TourCourse: FC<{ list: TourIntroductionUnionType }> = ({ list }) => {
	const { isToggle, setIsToggle } = useToggleState();

	return (
		<>
			{isTourCourse(list) && (
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
											<div className={styles.item_title}>코스 테마</div>
											<div className={styles.item_value}>{item.theme}</div>
											<div className={styles.item_title}>코스총소요시간</div>
											<div className={styles.item_value}>{item.taketime}</div>
										</div>
										<div className={styles.item_wrap}>
											<div className={styles.item_title}>코스총거리</div>
											<div className={styles.item_value}>{item.distance}</div>
											<div className={styles.item_title}>문의 및 안내</div>
											<div className={styles.item_value}>
												{item.infocentertourcourse}
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
			<AdditionalTourCourse />
		</>
	);
};

export default TourCourse;
