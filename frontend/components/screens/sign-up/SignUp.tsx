import Format from '@/components/ui/layout/Format';
import React, { FC } from 'react';
import styles from './SignUp.module.scss';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthFields } from './sign-up.interface';
import { useMutation } from 'react-query';
import Field from '@/components/ui/field/Field';
import { validEmail } from './sign-up.constants';
import { AuthService } from '@/services/auth/auth.service';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import axios from 'axios';
import { useRouter } from 'next/router';

const SignUp: FC = () => {
	const router = useRouter();
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<AuthFields>({
		mode: 'onChange',
	});

	const { mutate: registerSync } = useMutation(
		['register'],
		(data: AuthFields) =>
			AuthService.register(data.email, data.password, data.username),
		{
			onMutate: variable => {
				Loading.hourglass();
			},
			onSuccess(data) {
				Loading.remove();
				Report.success('성공', `${data.username}님 환영합니다.`, '확인', () =>
					router.push('/login'),
				);
				reset();
			},
			onError(error) {
				if (axios.isAxiosError(error)) {
					Loading.remove();
					Report.warning('실패', `${error.response?.data.message}`, '확인');
				}
			},
		},
	);

	const onSubmit: SubmitHandler<AuthFields> = data => {
		registerSync(data);
		reset();
	};

	return (
		<Format title={'signup'}>
			<div className={styles.container}>
				<div className={styles.contents_card}>
					<div className={styles.contents_wrap}>
						<div className={styles.signin__header_title}>회원가입</div>
						<div className={styles.signin__header_subtitle}>
							이메일과 비밀번호를 이용하여 로그인 할 수 있습니다.
						</div>
						<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
							<Field
								{...register('email', {
									required: 'Email is required',
									pattern: {
										value: validEmail,
										message: 'Please enter a valid email address',
									},
								})}
								placeholder="Email"
								error={errors.email}
							/>
							<Field
								{...register('password', {
									required: 'Password is required',
									minLength: {
										value: 10,
										message: 'Min length should more 10 symbols',
									},
								})}
								placeholder="Password"
								error={errors.password}
								type={'password'}
							/>
							<Field
								{...register('username', {
									required: 'username is required',
									minLength: {
										value: 3,
										message: 'Min length should more 3 symbols',
									},
								})}
								placeholder="username"
								error={errors.username}
							/>
							<button>회원가입</button>
						</form>
					</div>
					<div className={styles.footer_wrap}>
						이미 회원이신가요?
						<Link href={'/signin'} className={styles.signup}>
							로그인
						</Link>
					</div>
				</div>
			</div>
		</Format>
	);
};

export default SignUp;
