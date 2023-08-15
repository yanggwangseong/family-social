import Format from '@/components/ui/layout/Format';
import mainLandingAnimation from '@/assets/lottie/landing.json';
import Lottie from 'lottie-react';
import { FaGoogle, FaSignInAlt } from 'react-icons/fa';
import React, { FC } from 'react';
import Link from 'next/link';
import styles from './Home.module.scss';
import Image from 'next/image';

const Home: FC = () => {
	return (
		<Format title={'main'}>
			<div className={styles.container}>
				<div className="h-1/2 flex">
					<div className="w-1/2 flex justify-center">
						<Lottie animationData={mainLandingAnimation} />
					</div>
					<div className="p-10 ml-20">
						<div className="font-bold text-4xl text-customDark">
							팸 커뮤니티
						</div>
						<div className="mt-4 text-customGray text-lg">
							함께 콘텐츠를 연결하고 공유하세요.
						</div>
						<div className="text-lg mt-16">Sign in to Fam</div>
						<div className="mt-6">
							<Link
								href={'/login'}
								className="text-customDark text-center w-full inline-block border border-solid border-customDark py-4 font-bold"
								style={{ height: '56px', width: '504px', borderRadius: '40px' }}
							>
								<div className="flex justify-center">
									<div className="flex justify-center items-center">
										<FaSignInAlt color="#DB4437"></FaSignInAlt>
									</div>
									<div className="ml-2">로그인</div>
								</div>
							</Link>
						</div>
						<div className="mt-4">
							<Link
								href={'/login'}
								className="text-customDark text-center w-full inline-block border border-solid border-customDark py-4 font-bold"
								style={{ height: '56px', width: '504px', borderRadius: '40px' }}
							>
								<div className="flex justify-center">
									<div className="flex justify-center items-center">
										<FaGoogle color="#4285F4" size={24}></FaGoogle>
									</div>
									<div className="ml-2">구글 로그인</div>
								</div>
							</Link>
						</div>
						<div className="mt-4">
							<Link
								href={'/'}
								className="text-customDark text-center w-full inline-block border border-solid border-customDark py-4 font-bold"
								style={{ height: '56px', width: '504px', borderRadius: '40px' }}
							>
								<div className="flex justify-center">
									<div className="flex justify-center items-center">
										<Image
											src="/images/naver/naver_btn.png"
											alt="네이버 로그인 버튼"
											width={26}
											height={26}
										></Image>
									</div>
									<div className="ml-2">네이버 로그인</div>
								</div>
							</Link>
						</div>
						<div className="mt-4">
							<Link
								href={'/'}
								className="text-customDark text-center w-full inline-block border border-solid border-customDark py-4 font-bold"
								style={{ height: '56px', width: '504px', borderRadius: '40px' }}
							>
								<div className="flex justify-center">
									<div className="flex justify-center items-center">
										<Image
											src="/images/kakao/kakao_btn.png"
											alt="카카오 로그인 버튼"
											width={26}
											height={26}
										></Image>
									</div>
									<div className="ml-2">카카오 로그인</div>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</Format>
	);
};

export default Home;
