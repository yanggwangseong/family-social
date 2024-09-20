import React, { FC } from 'react';
import styles from './ScheduleThumbnailImage.module.scss';
import Image from 'next/image';
import { GoPencil } from 'react-icons/go';
import ImageCropper from '@/components/ui/image-cropper/ImageCropper';
import { useUploadImage } from '@/hooks/useUploadImage';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { useForm } from 'react-hook-form';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { ScheduleService } from '@/services/schedule/schedule.service';
import { modalAtom } from '@/atoms/modalAtom';
import { useRecoilState } from 'recoil';
import LayerModalVariantWrapper from '../LayerModalVariantWrapper';
import { useCreateMutation } from '@/hooks/useCreateMutation';

const ScheduleThumbnailImage: FC = () => {
	const { isFiles, handleUploadImage, uploadImage } = useUploadImage();
	const [, setIsShowing] = useRecoilState<boolean>(modalAtom);

	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		reset,
		getValues,
		watch,
	} = useForm({
		mode: 'onChange',
	});

	const { mutateAsync: scheduleUploadThumbnailASync } = useCreateMutation(
		async (file: File) =>
			await ScheduleService.uploadScheduleThumbnailImage(
				file,
				'510c756b-c73e-4242-8e98-9535fb35b52a',
			),
		{
			mutationKey: ['schedule-thumbnail-image-upload'],
			onSuccess: data => {
				Loading.remove();
				Report.success(
					'성공',
					`여행일정 썸네일 수정이 성공 하였습니다`,
					'확인',
					() => {
						setIsShowing(false);
					},
				);
			},
		},
	);

	const onSubmit = async () => {
		if (isFiles) {
			const url = await scheduleUploadThumbnailASync(isFiles);
		}
	};

	return (
		<LayerModalVariantWrapper className={styles.container}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
		</LayerModalVariantWrapper>
	);
};

export default ScheduleThumbnailImage;
