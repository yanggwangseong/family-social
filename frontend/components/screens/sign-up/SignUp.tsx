import Format from '@/components/ui/layout/Format';
import React, { FC, useState } from 'react';
import styles from './SignUp.module.scss';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthFields } from './sign-up.interface';
import { useMutation } from 'react-query';
import Field from '@/components/ui/field/Field';
import {
	validEmail,
	validPassword,
	validPhoneNumber,
} from './sign-up.constants';
import { AuthService } from '@/services/auth/auth.service';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import axios from 'axios';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import EmailVerify from './email-verify/EmailVerify';
import { motion } from 'framer-motion';

const visible = {
	opacity: 1,
	y: 0,
	transition: { duration: 0.5 },
};

const itemVariants = {
	hidden: { opacity: 0, y: 10 },
	visible,
};

const SignUp: FC = () => {
	const [isEmailVerify, setEmailVerify] = useState<boolean>(false);

	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		reset,
		getValues,
		watch,
	} = useForm<AuthFields>({
		mode: 'onChange',
	});

	const { mutate: registerSync } = useMutation(
		['register'],
		(data: AuthFields) =>
			AuthService.register(
				data.email,
				data.password,
				data.username,
				data.phoneNumber,
			),
		{
			onMutate: variable => {
				Loading.hourglass();
			},
			onSuccess(data) {
				Loading.remove();
				Report.success('성공', `${data.username}님 환영합니다.`, '확인', () =>
					setEmailVerify(true),
				);
				//reset();
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

	const password = watch('password');

	const onSubmit: SubmitHandler<AuthFields> = data => {
		registerSync(data);
		//reset();
	};

	return (
		<Format title={'signup'}>
			{isEmailVerify ? (
				<EmailVerify email={getValues('email')} />
			) : (
				<div className={styles.container}>
					<div className={styles.contents_card}>
						<motion.div
							className={styles.contents_wrap}
							initial="hidden"
							animate="visible"
							exit={{ opacity: 0, transition: { duration: 1 } }}
							variants={{
								visible: { transition: { staggerChildren: 0.3 } },
							}}
						>
							<motion.div
								className={styles.signin__header_title}
								variants={itemVariants}
							>
								회원가입
							</motion.div>
							<motion.div
								className={styles.signin__header_subtitle}
								variants={itemVariants}
							>
								이메일과 비밀번호를 이용하여 로그인 할 수 있습니다.
							</motion.div>
							<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
								<div>
									<div className={styles.form_label}>Email</div>
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
								</div>
								<div>
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
								<div className={styles.form_label}>비밀번호 확인</div>
								<Field
									{...register('passwordCompare', {
										required: '비밀번호 확인은 필수입니다!',
										validate: value =>
											value === password || '비밀번호와 일치하지 않습니다', // 비밀번호 확인과 일치하는지 검증
									})}
									placeholder="비밀번호 확인을 입력 해주세요!"
									error={errors.passwordCompare}
									type={'password'}
									autoComplete="off"
								/>
								<div className={styles.form_label}>이름</div>
								<Field
									{...register('username', {
										required: '이름은 필수입니다!',
										minLength: {
											value: 2,
											message: '최소 이름은 2자 이상입니다.',
										},
									})}
									placeholder="이름을 입력 해주세요!"
									error={errors.username}
								/>
								<div className={styles.form_label}>전화번호</div>
								<Field
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
								/>

								<CustomButton
									type="submit"
									className="mt-8 bg-customOrange text-customDark font-bold border border-solid border-customDark rounded-full p-[10px] w-full"
									disabled={!isValid}
								>
									회원가입
								</CustomButton>
							</form>
						</motion.div>
						<div className={styles.footer_wrap}>
							이미 회원이신가요?
							<Link href={'/signin'} className={styles.signup}>
								로그인
							</Link>
						</div>
					</div>
				</div>
			)}
		</Format>
	);
};

export default SignUp;
