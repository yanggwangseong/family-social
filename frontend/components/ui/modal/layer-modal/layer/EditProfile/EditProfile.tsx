import React, { FC, useEffect, useState } from 'react';
import styles from './EditProfile.module.scss';
import Image from 'next/image';
import { GoPencil } from 'react-icons/go';
import Field from '@/components/ui/field/Field';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { useForm } from 'react-hook-form';
import { EditProfileFields } from './edit-profile.interface';
import { validPhoneNumber } from '@/components/screens/sign-up/sign-up.constants';
import ImageCropper from '@/components/ui/image-cropper/ImageCropper';
import { blobToFile } from '@/utils/file';
import { useMutation } from 'react-query';
import { MediaService } from '@/services/media/media.service';
import axios from 'axios';
import { Report } from 'notiflix/build/notiflix-report-aio';

const EditProfile: FC = () => {
	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		reset,
		getValues,
		watch,
	} = useForm<EditProfileFields>({
		mode: 'onChange',
	});

	const { mutateAsync: profileImageUploadASync } = useMutation(
		['profile-image-upload'],
		async (file: File) => await MediaService.uploadProfileImage(file),
		{
			onMutate: variable => {},
			onSuccess(data: string[]) {},
			onError(error) {
				if (axios.isAxiosError(error)) {
					Report.warning('실패', `${error.response?.data.message}`, '확인');
				}
			},
		},
	);

	const [isFiles, setIsFiles] = useState<File>();
	const [uploadImage, setUploadImage] = useState<{
		image: Blob | null;
		fileName: string;
	}>({ image: null, fileName: '' });

	const handleUploadImage = (image: Blob, fileName: string) =>
		setUploadImage({ image, fileName });

	useEffect(() => {
		if (uploadImage.image) {
			const file = blobToFile(uploadImage.image, uploadImage.fileName);
			setIsFiles(file);
		}
	}, [uploadImage]);

	const handleImageUpload = async () => {
		if (isFiles) {
			const file = await profileImageUploadASync(isFiles);
			console.log(file);
		}
	};

	return (
		<div className={styles.edit_profile_container}>
			<div className={styles.contents_wrap}>
				<div className={styles.profile_img_container}>
					<ImageCropper aspectRatio={1 / 1} onCrop={handleUploadImage}>
						<div className={styles.image_wrap}>
							<Image
								className={styles.profile_img}
								width={120}
								height={120}
								src={'/images/profile/profile.png'}
								alt="img"
							></Image>
							<div className={styles.profile_img_icon_container}>
								<GoPencil size={18} color="#0a0a0a" />
							</div>
						</div>
					</ImageCropper>
				</div>
				<div className={styles.field_container}>
					<Field
						fieldClass={'inline_input'}
						labelText={'이름'}
						{...register('username', {
							required: '이름은 필수입니다!',
							minLength: {
								value: 2,
								message: '최소 이름은 2자 이상입니다.',
							},
						})}
						placeholder="이름을 입력 해주세요!"
						error={errors.username}
					></Field>
					<Field
						fieldClass={'inline_input'}
						labelText={'휴대폰번호'}
						{...register('phoneNumber', {
							required: '전화번호는 필수입니다',
							minLength: {
								value: 11,
								message: '전화번호는 11자리 입니다.',
							},
							pattern: {
								value: validPhoneNumber,
								message: '휴대폰번호 형식을 확인해주세요!',
							},
						})}
						maxLength={11}
						placeholder="휴대폰 번호를 '-'를 제외하고 입력 해주세요."
						error={errors.phoneNumber}
					></Field>
				</div>
			</div>

			<CustomButton
				type="button"
				className="mt-8 bg-customOrange text-customDark 
				font-bold border border-solid border-customDark 
				rounded-full p-[10px]
				w-full hover:bg-orange-500
				"
				onClick={handleImageUpload}
			>
				수정하기
			</CustomButton>
		</div>
	);
};

export default EditProfile;
