import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import React, { FC } from 'react';
import styles from './AreaCode.module.scss';

const AreaCode: FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.wrap}>
				<div className={styles.contents_wrap}>
					<div className={styles.area_code_container}>
						<div className={styles.area_code_main_item_wrap}>
							<div className={styles.area_code_header}>시/도</div>
							<div className={styles.area_code_lst_container}>
								<div className={styles.area_code_item}>서울</div>
								<div className={styles.area_code_item}>강원특별자치도</div>
							</div>
						</div>
						<div className={styles.area_code_sub_item_wrap}>
							<div className={styles.area_code_header}>시/군/구</div>
							<div className={styles.area_code_lst_container}>
								<div className={styles.area_code_item}>서울</div>
								<div className={styles.area_code_item}>기타지역</div>
								<div className={styles.area_code_item}>강서구</div>
							</div>
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

export default AreaCode;
