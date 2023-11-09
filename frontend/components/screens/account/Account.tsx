import React, { FC } from 'react';
import styles from './Account.module.scss';
import Format from '@/components/ui/layout/Format';
import Header from '@/components/ui/header/Header';
import MainSidebar from '@/components/ui/layout/sidebar/main/MainSidebar';
import RightSidebar from '@/components/ui/layout/sidebar/main/rightSidebar/RightSidebar';
import Image from 'next/image';
import TabMenu from '@/components/ui/tab-menu/TabMenu';
import { accountTabMenus } from '@/components/ui/tab-menu/tab-menu.constants';
import { IoLogOutOutline } from 'react-icons/io5';
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
								<div className="ml-auto flex flex-row gap-2">
									<div
										className="text-sm text-customDark font-bold px-5 
                                    py-2 border border-solid border-customDark rounded-full
                                    hover:bg-customOrange cursor-pointer
                                    "
									>
										프로필 수정
									</div>
									<div
										className="text-sm text-customDark font-bold px-5 
                                    py-2 border border-solid border-customDark rounded-full
                                    cursor-pointer flex gap-2 bg-customOrange
                                    "
									>
										<IoLogOutOutline size={24} />
										로그아웃
									</div>
								</div>
							</div>
							<div className="mt-6">
								<div className="text-2xl text-customDark font-bold">양광성</div>
								<div className="text-customGray text-sm mt-2">@양광성</div>
							</div>
							<div className="mt-7">
								<TabMenu list={accountTabMenus} options={'MYFEED'}></TabMenu>
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
