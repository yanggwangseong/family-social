import React, { FC } from 'react';
import styles from './ScheduleThumbnailImage.module.scss';
import Image from 'next/image';
import { GoPencil } from 'react-icons/go';
import ImageCropper from '@/components/ui/image-cropper/ImageCropper';
import { useUploadImage } from '@/hooks/useUploadImage';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { ScheduleService } from '@/services/schedule/schedule.service';
import { useMutation } from 'react-query';
import { modalAtom } from '@/atoms/modalAtom';
import { useRecoilState } from 'recoil';

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

	const { mutateAsync: scheduleUploadThumbnailASync } = useMutation(
		['schedule-thumbnail-image-upload'],
		async (file: File) =>
			await ScheduleService.uploadScheduleThumbnailImage(
				file,
				'510c756b-c73e-4242-8e98-9535fb35b52a',
			),
		{
			onMutate: variable => {
				Loading.hourglass();
			},
			onSuccess(data) {
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
			onError(error) {
				if (axios.isAxiosError(error)) {
					Report.warning('실패', `${error.response?.data.message}`, '확인');
				}
			},
		},
	);

	const onSubmit = async () => {
		if (isFiles) {
			const url = await scheduleUploadThumbnailASync(isFiles);
		}
	};

	return (
		<div className={styles.container}>
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
		</div>
	);
};

export default ScheduleThumbnailImage;
