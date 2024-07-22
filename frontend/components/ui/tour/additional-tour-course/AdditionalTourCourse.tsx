import { useToggleState } from '@/hooks/useToggleState';
import { useTourAdditionalExplanation } from '@/hooks/useTourAdditionalExplanation';
import { isAdditionalTourCourse } from '@/utils/type-guard';
import React, { FC, Fragment } from 'react';
import styles from './AdditionalTourCourse.module.scss';
import {
	IoChevronDownOutline,
	IoChevronUp,
	IoInformationCircle,
} from 'react-icons/io5';

const AdditionalTourCourse: FC = () => {
	const { data } = useTourAdditionalExplanation();

	const { isToggle, setIsToggle } = useToggleState();

	return (
		<>
			{data && isAdditionalTourCourse(data) && data.list.length > 0 && (
				<div className={styles.additional_container}>
					<div className={styles.title_container}>
						<div>
							<IoInformationCircle size={18} color="#0a0a0a" />
						</div>
						<div className={styles.title}>추가 정보:</div>
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
							{data.list.map((data, index) => (
								<Fragment key={index}>
									<div className={styles.item_wrap}>
										<div className={styles.item_title}>코스명</div>
										<div className={styles.item_value}>{data.subname}</div>
									</div>
									<div className={styles.item_wrap} key={index}>
										<div className={styles.item_title}>코스 설명</div>
										<div className={styles.item_value}>{data.subdetailalt}</div>
									</div>
								</Fragment>
							))}
						</>
					)}
				</div>
			)}
		</>
	);
};

export default AdditionalTourCourse;
