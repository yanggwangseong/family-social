import React, { FC } from 'react';
import styles from './EditProfile.module.scss';
import Image from 'next/image';
import { GoPencil } from 'react-icons/go';
import Field from '@/components/ui/field/Field';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { useForm } from 'react-hook-form';
import { EditProfileFields } from './edit-profile.interface';
import { validPhoneNumber } from '@/components/screens/sign-up/sign-up.constants';

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

	return (
		<div className={styles.edit_profile_container}>
			<div className={styles.profile_img_container}>
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
			<CustomButton
				type="button"
				className="mt-8 bg-customOrange text-customDark 
            font-bold border border-solid border-customDark 
            rounded-full p-[10px]
            w-full hover:bg-orange-500
            "
			>
				수정하기
			</CustomButton>
		</div>
	);
};

export default EditProfile;
