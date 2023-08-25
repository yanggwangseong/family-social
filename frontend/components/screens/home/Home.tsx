import Format from '@/components/ui/layout/Format';
import mainLandingAnimation from '@/assets/lottie/landing.json';
import Lottie from 'lottie-react';
import { FaGoogle, FaSignInAlt } from 'react-icons/fa';
import React, { FC } from 'react';
import Link from 'next/link';
import styles from './Home.module.scss';
import Image from 'next/image';
import LoginButton from '@/components/ui/button/main/LoginButton';

const Home: FC = () => {
	return (
		<Format title={'main'}>
			<div className={styles.container}>
				<div className={styles.contents_wrap}>
					<div className={styles.lottie_container}>
						<Lottie
							className={styles.lottie}
							animationData={mainLandingAnimation}
						/>
					</div>
					<div className={styles.contents_container}>
						<div className={styles.contents_title_wrap}>팸 커뮤니티</div>
						<div className={styles.contents_subtitle}>
							함께 콘텐츠를 연결하고 공유하세요.
						</div>
						<div className={styles.sign_subject}>Sign in to Fam</div>

						<LoginButton
							link="signin"
							text="로그인"
							Icon={FaSignInAlt}
							IconColor="DB4437"
							IconSize={24}
						></LoginButton>

						<LoginButton
							link="/"
							text="구글 로그인"
							Icon={FaGoogle}
							IconColor="4285F4"
							IconSize={24}
						></LoginButton>

						<LoginButton
							link="/"
							text="네이버 로그인"
							imgUrn="/images/naver/naver_btn.png"
						></LoginButton>

						<LoginButton
							link="/"
							text="카카오 로그인"
							imgUrn="/images/kakao/kakao_btn.png"
						></LoginButton>
					</div>
				</div>
			</div>
		</Format>
	);
};

export default Home;
