import React, { FC } from 'react';
import styles from './ServiceCategory.module.scss';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';

const ServiceCategory: FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.wrap}>
				<div className={styles.contents_wrap}>
					<div className={styles.service_category_container}>
						<div className={styles.service_category_item_wrap}>
							<div className={styles.service_category_header}>대분류</div>
						</div>
						<div className={styles.service_category_item_wrap}>
							<div className={styles.service_category_header}>중분류</div>
						</div>
						<div className={styles.service_category_item_wrap}>
							<div className={styles.service_category_header}>소분류</div>
						</div>
					</div>
				</div>

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
