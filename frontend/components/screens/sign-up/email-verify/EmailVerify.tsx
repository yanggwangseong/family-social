import React, { FC } from 'react';
import styles from './EmailVerify.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EmailVerifyType } from '@/shared/interfaces/auth.interface';
import Field from '@/components/ui/field/Field';
import { useMutation } from 'react-query';
import { AuthService } from '@/services/auth/auth.service';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import axios from 'axios';
import { useRouter } from 'next/router';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';

const EmailVerify: FC<{ email: string }> = ({ email }) => {
	const router = useRouter();

	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		reset,
		getValues,
		watch,
	} = useForm<EmailVerifyType>({
		mode: 'onChange',
	});

	const { mutate: verifySync } = useMutation(
		['emailverify'],
		(data: EmailVerifyType) =>
			AuthService.emailVerify(data.emailVerifyCode, email),
		{
			onMutate: variable => {
				Loading.hourglass();
			},
			onSuccess(data) {
				Loading.remove();
				Report.success(
					'성공',
					`${data.username}님 로그인 페이지에서 로그인 해주세요.`,
					'확인',
					() => router.push('/signin'),
				);
			},
			onError(error) {
				if (axios.isAxiosError(error)) {
					Report.warning(
						'실패',
						`${error.response?.data.message}`,
						'확인',
						() => Loading.remove(),
					);
				}
			},
		},
	);

	const onSubmit: SubmitHandler<EmailVerifyType> = data => {
		verifySync(data);
	};

	return (
		<div className={styles.container}>
			<div className={styles.contents_card}>
				<div className={styles.contents_wrap}>
					<div className={styles.signin__header_title}>이메일 인증 확인</div>
					<div className={styles.signin__header_subtitle}>
						이메일을 확인하려면 아래에 입력 하세요.
					</div>
					<div className={styles.signin__email_description}>
						코드가 포함된 이메일을 {email}(으)로 보냈습니다.
					</div>
					<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
						<div className={styles.form_label}>확인 코드</div>
						<Field
							{...register('emailVerifyCode', {
								required: '이메일 확인 코드를 입력 해주세요',
							})}
							error={errors.emailVerifyCode}
							type={'text'}
						/>

						<CustomButton
							type="submit"
							className="mt-8 bg-customOrange text-customDark font-bold border border-solid border-customDark rounded-full p-[10px] w-full"
							disabled={!isValid}
						>
							확인
						</CustomButton>
					</form>
				</div>
			</div>
		</div>
	);
};

export default EmailVerify;
