import Format from '@/components/ui/layout/Format';
import mainLandingAnimation from '@/assets/lottie/mainLanding.json';
import Lottie from 'lottie-react';
import React, { FC } from 'react';
import Link from 'next/link';

const Home: FC = () => {
	return (
		<Format title={'main'}>
			<div className="flex justify-center h-full items-center">
				<div className="h-1/2 flex">
					<div className="w-1/2 h-10">
						<Lottie animationData={mainLandingAnimation} loop={false} />
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
								className="text-customDark text-center w-full inline-block border border-solid border-customDark rounded-3xl py-4 font-bold"
								style={{ height: '56px', width: '504px' }}
							>
								로그인
							</Link>
						</div>
					</div>
				</div>
				<div></div>
			</div>
		</Format>
	);
};

export default Home;
