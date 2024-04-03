import React, { FC, useState } from 'react';
import styles from './EmailInvite.module.scss';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import Field from '@/components/ui/field/Field';
import { useForm } from 'react-hook-form';
import { validEmail } from '@/components/screens/sign-up/sign-up.constants';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Line from '@/components/ui/line/Line';
import InviteItem from './invite-item/InviteItem';

const EmailInvite: FC = () => {
	const [isInvitedEmails, setIsInvitedEmails] = useState<string[]>([]);

	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		reset,
		getValues,
		watch,
	} = useForm<{ email: string }>({
		mode: 'onChange',
	});

	const handleAddInviteEmail = () => {
		if (!isValid) {
			Notify.warning(errors.email?.message ?? '이메일 형식을 확인 해주세요!');
			return false;
		}
		const newEmail = getValues('email');

		setIsInvitedEmails(prevEmails => {
			return [...prevEmails, newEmail.trim()];
		});
		reset({ email: '' });

		return true;
	};

	const handleExcludeInviteEmail = (email: string) => {
		setIsInvitedEmails([...isInvitedEmails.filter(item => item !== email)]);
	};

	return (
		<div>
			<div className="flex flex-col gap-4 my-4">
				<div className="font-medium text-base">이메일 주소 추가</div>
				<div className=" text-customGray text-sm">
					이메일 주소를 추가하여 최대 5명을 한 번에 초대 할 수 있습니다.
				</div>
				<div className="flex gap-4">
					<div className="w-full">
						<Field
							fieldClass={'inline_input'}
							labelText={'이메일 주소 입력'}
							{...register('email', {
								required: '이메일 입력은 필수입니다!',
								pattern: {
									value: validEmail,
									message: '이메일 형식을 확인 해주세요!',
								},
								validate: value =>
									!isInvitedEmails.includes(value) ||
									'이 이메일 주소는 이미 초대된 리스트에 추가 되었습니다.',
							})}
							placeholder="이메일을 입력해주세요!"
							error={errors.email}
						></Field>
					</div>
					<div className="w-[15%]">
						<CustomButton
							type="button"
							className="bg-customOrange text-customDark text-sm
                            font-bold border border-solid border-customDark w-full mt-3 
                            rounded hover:opacity-80 py-2 px-1"
							onClick={handleAddInviteEmail}
							disabled={!isValid}
						>
							추가
						</CustomButton>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-4">
				{isInvitedEmails.length > 0 && (
					<>
						<div className="font-medium text-base">
							초대받은 사람 {isInvitedEmails.length} 명
						</div>
						{isInvitedEmails.map((item, index) => (
							<InviteItem
								key={index}
								email={item}
								handleExcludeInviteEmail={handleExcludeInviteEmail}
							/>
						))}
					</>
				)}
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
