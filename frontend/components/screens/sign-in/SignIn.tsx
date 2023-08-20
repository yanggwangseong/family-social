import Format from '@/components/ui/layout/Format';
import React, { FC } from 'react';
import styles from './SignIn.module.scss';
import Link from 'next/link';

const SignIn: FC = () => {
	return (
		<Format title={'signin'}>
			<div className={styles.container}>
				<div className={styles.contents_card}>
					<div className={styles.contents_wrap}>
						<div className={styles.signin__header_title}>Login</div>
						<div className={styles.signin__header_subtitle}>
							이메일과 비밀번호를 이용하여 로그인 할 수 있습니다.
						</div>
					</div>
					<div className={styles.footer_wrap}>
						회원이 아니신가요?{' '}
						<Link href={'/signup'} className={styles.signup}>
							회원가입
						</Link>
					</div>
				</div>
			</div>
		</Format>
	);
};

export default SignIn;
