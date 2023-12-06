import React, { FC } from 'react';
import styles from './SchedulePeriod.module.scss';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';

const SchedulePeriod: FC = () => {
	return (
		<div className={styles.period_container}>
			<div className={styles.step_title}>STEP 2</div>
			<div className={styles.title}>여행 기간이 어떻게 되시나요?</div>
			<div className={styles.button_container}>
				<CustomButton
					type="button"
					className="mt-8 mb-4 bg-white text-customDark 
        font-bold border border-solid border-customDark 
        rounded-full p-[10px] w-full hover:opacity-80"
				>
					이전
				</CustomButton>
				<CustomButton
					type="button"
					className="mt-8 mb-4 bg-customOrange text-customDark 
            font-bold border border-solid border-customDark 
            rounded-full p-[10px]
            w-full hover:bg-orange-500
            "
				>
					다음
				</CustomButton>
			</div>
		</div>
	);
};

export default SchedulePeriod;
