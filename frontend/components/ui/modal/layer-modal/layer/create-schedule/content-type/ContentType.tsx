import React, { FC } from 'react';
import styles from './ContentType.module.scss';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import {
	ContentTypeId,
	ContentTypeName,
} from '@/constants/content-type.constant';

const ContentType: FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.wrap}>
				<div className={styles.contents_wrap}>
					<div className="flex flex-wrap">
						{ContentTypeId.map((value, index) => {
							return <div className="p-6 w-1/2">{ContentTypeName[value]}</div>;
						})}
					</div>
				</div>

				<div className={styles.btn_container}>
					<CustomButton
						type="button"
						className="mt-8 mb-4 bg-customDark text-customOrange 
									font-bold border border-solid border-customDark 
									rounded-full p-[10px] w-full hover:opacity-80"
					>
						확인
					</CustomButton>

					<CustomButton
						type="button"
						className="mt-8 mb-4 bg-white text-customDark 
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

export default ContentType;
