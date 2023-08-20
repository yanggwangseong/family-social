import Format from '@/components/ui/layout/Format';
import React, { FC } from 'react';
import styles from './SignUp.module.scss';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthFields } from './sign-up.interface';
import { useMutation } from 'react-query';
import Field from '@/components/ui/field/Field';
import { validEmail } from './sign-up.constants';

const SignUp: FC = () => {
	return (
		<Format title={'signup'}>
			<div className={styles.container}>
				<div className={styles.contents_card}>
					<div className={styles.contents_wrap}>
						<div className={styles.signin__header_title}>회원가입</div>
						<div className={styles.signin__header_subtitle}>
							이메일과 비밀번호를 이용하여 로그인 할 수 있습니다.
						</div>
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
