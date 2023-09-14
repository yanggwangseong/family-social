import Format from '@/components/ui/layout/Format';
import React, { FC } from 'react';
import styles from './SignIn.module.scss';
import Link from 'next/link';
import Field from '@/components/ui/field/Field';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginFields } from './sign-in.interface';
import { validEmail, validPassword } from '../sign-up/sign-up.constants';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { useMutation } from 'react-query';
import { AuthService } from '@/services/auth/auth.service';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import axios from 'axios';

const SignIn: FC = () => {
	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		reset,
		getValues,
		watch,
	} = useForm<LoginFields>({
		mode: 'onChange',
	});

	const { mutate: loginSync } = useMutation(
		['login'],
		(data: LoginFields) => AuthService.signIn(data.email, data.password),
		{
			onMutate: variable => {
				Loading.hourglass();
			},
			onSuccess(data) {
				Loading.remove();
				Report.success('성공', `로그인 성공 하였습니다.`, '확인');
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

	const onSubmit: SubmitHandler<LoginFields> = data => {
		loginSync(data);
	};

	return (
		<Format title={'signin'}>
			<div className={styles.container}>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.contents_card}>
						<div className={styles.contents_wrap}>
							<div className={styles.signin__header_title}>로그인</div>
							<div className={styles.signin__header_subtitle}>
								이메일과 비밀번호를 이용하여 로그인 할 수 있습니다.
							</div>
							<div className={styles.label_field}>이메일</div>
							<Field
								{...register('email', {
									required: '이메일 입력은 필수입니다!',
									pattern: {
										value: validEmail,
										message: '이메일 형식을 확인 해주세요!',
									},
								})}
								placeholder="이메일을 입력해주세요!"
								error={errors.email}
							/>
							<div className={styles.form_label}>비밀번호</div>
							<Field
								{...register('password', {
									required: '비밀번호 입력은 필수입니다!',
									pattern: {
										value: validPassword,
										message: '영문,숫자,특수문자를 포함하여 작성해주세요',
									},
									minLength: {
										value: 10,
										message: '최소 비밀번호는 10자 이상입니다.',
									},
								})}
								placeholder="비밀번호를 입력해주세요!"
								error={errors.password}
								type={'password'}
								autoComplete="off"
							/>
						</div>
						<div className={styles.footer_wrap}>
							<CustomButton
								type="submit"
								className="mt-8 mb-4 bg-customOrange text-customDark font-bold border border-solid border-customDark rounded-full py-4 px-4 w-full"
								disabled={!isValid}
							>
								로그인
							</CustomButton>
							회원이 아니신가요?
							<Link href={'/signup'} className={styles.signup}>
								회원가입
							</Link>
						</div>
					</div>
				</form>
			</div>
		</Format>
	);
};

export default SignIn;
