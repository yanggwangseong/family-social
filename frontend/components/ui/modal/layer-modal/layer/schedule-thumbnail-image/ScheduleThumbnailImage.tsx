import React, { FC } from 'react';
import styles from './ScheduleThumbnailImage.module.scss';
import Image from 'next/image';
import { GoPencil } from 'react-icons/go';
import ImageCropper from '@/components/ui/image-cropper/ImageCropper';
import { useUploadImage } from '@/hooks/useUploadImage';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';

const ScheduleThumbnailImage: FC = () => {
	const { isFiles, handleUploadImage, uploadImage } = useUploadImage();

	return (
		<div className={styles.container}>
			<form className={styles.form}>
				<div className={styles.contents_wrap}>
					<div className={styles.profile_img_container}>
						<ImageCropper aspectRatio={1 / 1} onCrop={handleUploadImage}>
							<div className={styles.image_wrap}>
								<Image
									className={styles.profile_img}
									fill
									src={'/images/banner/group-base.png'}
									alt="img"
								></Image>
								<div className={styles.profile_img_icon_container}>
									<GoPencil size={18} color="#0a0a0a" />
								</div>
							</div>
						</ImageCropper>
					</div>
				</div>

				<CustomButton
					type="submit"
					className="mt-8 bg-customOrange text-customDark 
					font-bold border border-solid border-customDark 
					rounded-full p-[10px]
					w-full hover:bg-orange-500
					"
				>
					수정하기
				</CustomButton>
			</form>
		</div>
	);
};

export default ScheduleThumbnailImage;
