import React, { FC, Fragment } from 'react';
import styles from './AdditionalCommon.module.scss';
import {
	IoChevronDownOutline,
	IoChevronUp,
	IoInformationCircle,
} from 'react-icons/io5';
import { useToggleState } from '@/hooks/useToggleState';
import { useTourAdditionalExplanation } from '@/hooks/useTourAdditionalExplanation';
import { isAdditionalCommon } from '@/utils/type-guard';

const AdditionalCommon: FC = () => {
	const { data } = useTourAdditionalExplanation();

	const { isToggle, setIsToggle } = useToggleState();

	return (
		<>
			{data && isAdditionalCommon(data) && data.list.length > 0 && (
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
									<div className={styles.item_wrap} key={index}>
										<div className={styles.item_title}>{data.infoname}</div>
										<div className={styles.item_value}>{data.infotext}</div>
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

export default AdditionalCommon;
