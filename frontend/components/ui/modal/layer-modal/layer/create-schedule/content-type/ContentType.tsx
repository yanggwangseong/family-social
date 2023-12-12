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
					<div className={styles.content_type_container}>
						<div className={styles.content_type_item_wrap}>
							<div className={styles.content_type_item}>전체</div>
						</div>
						{ContentTypeId.map((value, index) => {
							return (
								<div className={styles.content_type_item_wrap}>
									<div className={styles.content_type_item}>
										{ContentTypeName[value]}
									</div>
								</div>
							);
						})}
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

export default ContentType;
