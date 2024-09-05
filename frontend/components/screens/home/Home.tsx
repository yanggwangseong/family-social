import Format from '@/components/ui/layout/Format';
import mainLandingAnimation from '@/assets/lottie/landing.json';
import splashAnimation from '@/assets/lottie/splash.json';
import Lottie from 'lottie-react';
import { FaGoogle, FaSignInAlt } from 'react-icons/fa';
import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Home.module.scss';
import Image from 'next/image';
import LoginButton from '@/components/ui/button/main/LoginButton';
import { API_URL } from '@/constants/index';
import { motion } from 'framer-motion';
import { itemVariants, visible } from '@/constants/animation.constant';
import { getLocalStorage, setLocalStorage } from '@/utils/local-storage';
import { getSessionStorage, setSessionStorage } from '@/utils/session-storage';

const style = {
	height: '100%',
};

const Home: FC = () => {
	const [isSplash, setIsSplash] = useState<boolean>(false);

	useLayoutEffect(() => {
		const init = getSessionStorage('init');

		if (init !== 'on') {
			setIsSplash(true); // Splash를 보여줌

			const timer = setTimeout(() => {
				setIsSplash(false);
				setSessionStorage('init', 'on'); // splash를 보여준 후 'on'으로 설정
			}, 5000);

			// 컴포넌트가 언마운트 될 때 타이머 클리어
			return () => {
				clearTimeout(timer);
			};
		}
	}, []);

	return (
		<>
			{isSplash ? (
				<div className={styles.splash_lottie_container}>
					<Lottie animationData={splashAnimation} loop={false} style={style} />
				</div>
			) : (
				<Format title={'main'}>
					<div className={styles.container}>
						<div className={styles.contents_wrap}>
							<div className={styles.lottie_container}>
								<Lottie
									className={styles.lottie}
									animationData={mainLandingAnimation}
								/>
							</div>

							<motion.div
								className={styles.contents_container}
								initial="hidden"
								animate="visible"
								exit={{ opacity: 0, transition: { duration: 1 } }}
								variants={{
									visible: { transition: { staggerChildren: 0.3 } },
								}}
							>
								<motion.div
									className={styles.contents_title_wrap}
									variants={{
										hidden: { opacity: 0, y: -20 },
										visible,
									}}
								>
									팸 커뮤니티
								</motion.div>
								<motion.div
									className={styles.contents_subtitle}
									variants={itemVariants}
								>
									함께 콘텐츠를 연결하고 공유하세요.
								</motion.div>
								<motion.div
									className={styles.sign_subject}
									variants={itemVariants}
								>
									Sign in to Fam
								</motion.div>
								<motion.div
									className={styles.button_container}
									variants={itemVariants}
								>
									<LoginButton
										link="signin"
										text="로그인"
										Icon={FaSignInAlt}
										IconColor="DB4437"
										IconSize={24}
									></LoginButton>

									<LoginButton
										link={`${API_URL}/auth/google/sign-in`}
										text="구글 로그인"
										Icon={FaGoogle}
										IconColor="4285F4"
										IconSize={24}
									></LoginButton>

									<LoginButton
										link={`${API_URL}/auth/naver/sign-in`}
										text="네이버 로그인"
										imgUrn="/images/naver/naver_btn.png"
									></LoginButton>

									<LoginButton
										link={`${API_URL}/auth/kakao/sign-in`}
										text="카카오 로그인"
										imgUrn="/images/kakao/kakao_btn.png"
									></LoginButton>
								</motion.div>
							</motion.div>
						</div>
					</div>
				</Format>
			)}
		</>
	);
};

export default Home;
