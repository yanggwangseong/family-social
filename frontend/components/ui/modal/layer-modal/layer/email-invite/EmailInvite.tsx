import React, { FC } from 'react';
import styles from './EmailInvite.module.scss';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import Field from '@/components/ui/field/Field';

const EmailInvite: FC = () => {
	return (
		<div>
			<div className="flex flex-col gap-4 my-4">
				<div className="font-medium text-xl">이메일 주소 추가</div>
				<div className=" text-customGray text-sm">
					이메일 주소를 추가하여 최대 5명을 한 번에 초대 할 수 있습니다.
				</div>
				<Field
					fieldClass={'inline_input'}
					labelText={'이메일 주소 입력'}
					// {...register('groupName', {
					//     required: '그룹명 입력은 필수입니다!',
					//     maxLength: {
					//         value: 60,
					//         message: '최대 60자까지 가능합니다',
					//     },
					// })}
					// placeholder="그룹명을 입력해주세요"
					// error={errors.groupName}
				></Field>
			</div>

			<div className="flex w-full gap-5">
				<CustomButton
					type="button"
					className="mt-8 mb-4 bg-customDark text-customOrange 
					font-bold border border-solid border-customDark 
					rounded-full p-[10px] w-full hover:opacity-80"
				>
					보내기
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
	);
};

export default EmailInvite;
