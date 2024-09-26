import React, { FC } from 'react';
import styles from './EditProfile.module.scss';
import Image from 'next/image';
import { PiPencilDuotone } from 'react-icons/pi';
import Field from '@/components/ui/field/Field';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
	EditProfileFields,
	UpdateProfileRequest,
} from './edit-profile.interface';
import { validPhoneNumber } from '@/components/screens/sign-up/sign-up.constants';
import ImageCropper from '@/components/ui/image-cropper/ImageCropper';
import { MediaService } from '@/services/media/media.service';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@/atoms/modalAtom';
import { MemberService } from '@/services/member/member.service';
import { useUploadImage } from '@/hooks/useUploadImage';
import LayerModalVariantWrapper from '../LayerModalVariantWrapper';
import { useCreateMutation } from '@/hooks/useCreateMutation';

const EditProfile: FC = () => {
	const { isFiles, handleUploadImage, uploadImage } = useUploadImage();
	const [, setIsShowing] = useRecoilState<boolean>(modalAtom);

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

	const { mutateAsync: profileImageUploadASync } = useCreateMutation(
		async (file: File) => await MediaService.uploadProfileImage(file),
		{
			mutationKey: ['profile-image-upload'],
			onMutate: () => {},
		},
	);

	const { mutateAsync: updateProfileASync } = useCreateMutation(
		async (data: UpdateProfileRequest) =>
			await MemberService.updateProfile(data),
		{
			mutationKey: ['update-profile'],
			onSuccess: data => {
				Loading.remove();
				Report.success('성공', `프로필 수정이 성공 하였습니다`, '확인', () => {
					setIsShowing(false);
				});
			},
		},
	);

	const onSubmit: SubmitHandler<EditProfileFields> = async ({
		username,
		phoneNumber,
	}) => {
		if (isFiles) {
			const url = await profileImageUploadASync(isFiles);
			await updateProfileASync({
				username,
				phoneNumber,
				memberId: '410b7202-660a-4423-a6c3-6377857241cc', // [Todo] 로그인한 사용자 아이디 가져오기
				profileImage: url[0], // [Todo] 만약 이미지 수정 안했으면 uploadImage null 일떄 기존 프로필 image 넣어주기
			});
		}
	};

	return (
		<LayerModalVariantWrapper className={styles.edit_profile_container}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
									<PiPencilDuotone size={18} color="#0a0a0a" />
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
					type="submit"
					className="mt-8 bg-customOrange text-customDark 
					font-bold border border-solid border-customDark 
					rounded-full p-[10px]
					w-full hover:bg-orange-500
					"
					disabled={!isValid}
				>
					수정하기
				</CustomButton>
			</form>
		</LayerModalVariantWrapper>
	);
};

export default EditProfile;
