import React, { FC } from 'react';
import styles from './EditProfile.module.scss';
import Image from 'next/image';
import { GoPencil } from 'react-icons/go';
import Field from '@/components/ui/field/Field';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';

const EditProfile: FC = () => {
	return (
		<div className="my-8">
			<div className="relative z-10 border border-solid border-customDark w-[120px] h-[120px] rounded-full">
				<Image
					className="rounded-full brightness-50"
					width={120}
					height={120}
					src={'/images/profile/profile.png'}
					alt="img"
				></Image>
				<div className={styles.profile_img_icon_container}>
					<GoPencil size={18} color="#0a0a0a" />
				</div>
			</div>
			<div className="mt-8 flex flex-col gap-6">
				<Field
					fieldClass={'inline_input'}
					labelText={'이름'}
					placeholder="이름을 입력해주세요"
				></Field>
				<Field
					fieldClass={'inline_input'}
					labelText={'휴대폰번호'}
					placeholder="휴대폰번호를 입력해주세요"
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
