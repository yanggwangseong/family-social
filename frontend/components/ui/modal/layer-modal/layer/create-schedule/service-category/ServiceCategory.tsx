import React, { FC } from 'react';
import styles from './ServiceCategory.module.scss';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';

const ServiceCategory: FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.wrap}>
				<div className={styles.contents_wrap}></div>

				<div className={styles.btn_container}>
					<CustomButton
						type="button"
						className="bg-customDark text-customOrange 
									font-bold border border-solid border-customDark 
									rounded-full p-[10px] w-full hover:opacity-80"
					>
						확인
					</CustomButton>

					<CustomButton
						type="button"
						className="bg-white text-customDark 
									font-bold border border-solid border-customDark 
									rounded-full p-[10px] w-full hover:bg-gray-200"
					>
						취소
					</CustomButton>
				</div>
			</div>
		</div>
	);
};

export default ServiceCategory;
