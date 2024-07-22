import { useToggleState } from '@/hooks/useToggleState';
import { useTourAdditionalExplanation } from '@/hooks/useTourAdditionalExplanation';
import React, { FC, Fragment } from 'react';
import styles from './AdditionalAccomodation.module.scss';
import { isAdditionalAccomodation } from '@/utils/type-guard';
import {
	IoChevronDownOutline,
	IoChevronUp,
	IoInformationCircle,
} from 'react-icons/io5';

const AdditionalAccomodation: FC = () => {
	const { data } = useTourAdditionalExplanation();

	const { isToggle, setIsToggle } = useToggleState();

	return (
		<>
			{data && isAdditionalAccomodation(data) && data.list.length > 0 && (
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
										<div className={styles.item_title}>TV 여부</div>
										<div className={styles.item_value}>{data.roomtv}</div>
									</div>
									<div className={styles.item_wrap} key={index}>
										<div className={styles.item_title}>냉장고 여부</div>
										<div className={styles.item_value}>
											{data.roomrefrigerator}
										</div>
									</div>
									<div className={styles.item_wrap} key={index}>
										<div className={styles.item_title}>기준인원</div>
										<div className={styles.item_value}>
											{data.roombasecount}
										</div>
									</div>
									<div className={styles.item_wrap} key={index}>
										<div className={styles.item_title}>인터넷여부</div>
										<div className={styles.item_value}>{data.roominternet}</div>
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

export default AdditionalAccomodation;
