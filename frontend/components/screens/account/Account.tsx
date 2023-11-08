import React, { FC } from 'react';
import styles from './Account.module.scss';
import Format from '@/components/ui/layout/Format';
import Header from '@/components/ui/header/Header';
import MainSidebar from '@/components/ui/layout/sidebar/main/MainSidebar';
import RightSidebar from '@/components/ui/layout/sidebar/main/rightSidebar/RightSidebar';
import Image from 'next/image';
import Profile from '@/components/ui/profile/Profile';

const Account: FC = () => {
	return (
		<Format title={'account'}>
			<div className={styles.container}>
				{/* 헤더 */}
				<Header />
				<div className={styles.contents_container}>
					{/* 왼쪽 사이드바 */}
					<MainSidebar />
					<div className={styles.detail_container}>
						<div className="w-full h-[200px] relative border-b border-solid border-customDark">
							<Image
								fill
								src={'/images/banner/group-base.png'}
								alt="banner"
								objectFit="cover"
							></Image>
						</div>
						<div className={styles.main_contents_container}>
							<div className="flex">
								<div className="-mt-20 relative z-10 border border-solid border-customDark w-[120px] h-[120px] rounded-full">
									<Image
										className="rounded-full"
										width={120}
										height={120}
										src={'/images/profile/profile.png'}
										alt="img"
									></Image>
								</div>
							</div>
						</div>
					</div>
					{/* 오른쪽 사이드바 */}
					<RightSidebar />
				</div>
			</div>
		</Format>
	);
};

export default Account;
