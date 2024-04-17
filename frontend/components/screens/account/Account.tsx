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
import { useRecoilState } from 'recoil';
import { modalAtom, modalLayerAtom } from '@/atoms/modalAtom';
import { LayerMode } from 'types';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import MyFeed from '../feed/my-feed/MyFeed';
import LottieLike from '@/components/ui/lottie/LottieLike';
import { useLottieLike } from '@/hooks/useLottieLike';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { MemberService } from '@/services/member/member.service';

const Account: FC<{ email: string }> = ({ email }) => {
	const router = useRouter();

	const [isShowing, setIsShowing] = useRecoilState(modalAtom);
	const [, setIsLayer] = useRecoilState(modalLayerAtom);

	const { handleIsLottie, lottieRef, handleLottieComplete } = useLottieLike();

	const { isSuccess, data } = useQuery(
		['get-member-by-email', email],
		async () => await MemberService.getMemberByMemberEmail(email),
		{
			enabled: !!email,
		},
	);

	const handleLogOut = () => {
		setIsShowing(!isShowing);
		setIsLayer({
			modal_title: '로그 아웃',
			layer: LayerMode.logoutConfirm,
		});
	};

	const handleEditProfile = () => {
		setIsShowing(!isShowing);
		setIsLayer({
			modal_title: '프로필 수정',
			layer: LayerMode.editProfile,
		});
	};

	return (
		<Format title={'account'}>
			<div className={styles.container}>
				{/* 헤더 */}
				<Header />
				<div className={styles.contents_container}>
					<LottieLike
						lottieRef={lottieRef}
						onLottieComplete={handleLottieComplete}
					/>
					{/* 왼쪽 사이드바 */}
					<MainSidebar />
					<div className={styles.detail_container}>
						{data && (
							<>
								<div className={styles.banner_container}>
									<Image
										fill
										src={data.coverImage ?? '/images/banner/group-base.png'}
										alt="banner"
										objectFit="cover"
									></Image>
								</div>
								<div className={styles.main_contents_container}>
									<div className={styles.account_top_container}>
										<div className={styles.profile_image_container}>
											<Image
												className={styles.profile_image}
												width={120}
												height={120}
												src={data.profileImage ?? '/images/profile/profile.png'}
												alt="img"
												onClick={handleEditProfile}
											></Image>
										</div>
										{data.isMine && (
											<div className={styles.top_btn_container}>
												<CustomButton
													type="button"
													className="text-sm text-customDark font-bold px-4 
												py-2 border border-solid border-customDark rounded-full
											hover:bg-customOrange cursor-pointer md:px-5"
													onClick={handleEditProfile}
												>
													프로필 수정
												</CustomButton>
												<CustomButton
													type="button"
													className="text-sm text-customDark font-bold px-3 
												py-2 border border-solid border-customDark rounded-full
												cursor-pointer flex gap-2 bg-customOrange md:px-5"
													onClick={handleLogOut}
												>
													<IoLogOutOutline size={24} />
													<div className={styles.log_out_text}>로그아웃</div>
												</CustomButton>
											</div>
										)}
									</div>

									<div className={styles.account_title_container}>
										<div className={styles.username}>{data.username}</div>
										<div className={styles.mention}>{`@${data.username}`}</div>
									</div>

									<div className={styles.tab_menu_container}>
										<div className={styles.tab_menu_wrap}>
											<TabMenu
												list={accountTabMenus}
												options={'MYFEED'}
											></TabMenu>
										</div>
										<MyFeed handleIsLottie={handleIsLottie} />
									</div>
								</div>
							</>
						)}
					</div>
					{/* 오른쪽 사이드바 */}
					<RightSidebar />
				</div>
			</div>
		</Format>
	);
};

export default Account;
