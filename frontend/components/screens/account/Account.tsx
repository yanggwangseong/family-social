import React, { ChangeEvent, FC, useRef } from 'react';
import styles from './Account.module.scss';
import Format from '@/components/ui/layout/Format';
import Header from '@/components/ui/header/Header';
import MainSidebar from '@/components/ui/layout/sidebar/main/MainSidebar';
import RightSidebar from '@/components/ui/layout/sidebar/main/rightSidebar/RightSidebar';
import Image from 'next/image';
import TabMenu from '@/components/ui/tab-menu/TabMenu';
import { makeTabMenuItem } from '@/components/ui/tab-menu/tab-menu.constants';
import { IoLogOutOutline } from 'react-icons/io5';
import { useRecoilState } from 'recoil';
import { modalAtom, modalLayerAtom } from '@/atoms/modalAtom';
import { LayerMode } from 'types';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import LottieLike from '@/components/ui/lottie/LottieLike';
import { useLottieLike } from '@/hooks/useLottieLike';

import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { PiPencilDuotone } from 'react-icons/pi';
import { MemberService } from '@/services/member/member.service';
import { MediaService } from '@/services/media/media.service';
import FeedContainer from '../feed/feed-container/FeedContainer';
import ScheduleContainer from '../schedule/schedule-container/ScheduleContainer';
import { useCreateMutation } from '@/hooks/useCreateMutation';
import { Loading, Report } from 'notiflix';

const Account: FC<{ email: string }> = ({ email }) => {
	const router = useRouter();

	const query = router.query as { options: 'MYFEED' | 'MYSCHEDULE' };

	const [isShowing, setIsShowing] = useRecoilState(modalAtom);
	const [, setIsLayer] = useRecoilState(modalLayerAtom);

	const { handleIsLottie, lottieRef, handleLottieComplete } = useLottieLike();

	const hiddenFileInput = useRef<HTMLInputElement | null>(null);

	const { isSuccess, data } = useQuery(
		['get-member-by-email', email],
		async () => await MemberService.getMemberByMemberEmail(email),
		{
			enabled: !!email,
		},
	);

	const { mutateAsync } = useCreateMutation(
		async (file: File) => await MediaService.uploadMemberCoverImage(file),
		{
			mutationKey: ['member-cover-image-upload'],
			onSuccess: data => {
				Loading.remove();
				Report.success(
					'이미지 업로드',
					'이미지 업로드에 성공 하였습니다.',
					'확인',
				);
			},
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

	const handleMemberCoverImageUpload = async (
		event: ChangeEvent<HTMLInputElement>,
	) => {
		const uploadedFiles: File[] = Array.from(event.target.files || []);

		await mutateAsync(uploadedFiles[0]);
	};

	const handleClick = () => {
		hiddenFileInput.current!.click();
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
									{data.isMine && (
										<div className={styles.banner_edit_btn}>
											<PiPencilDuotone size={22} />
											<button className={styles.btn_text} onClick={handleClick}>
												수정
											</button>

											<input
												type="file"
												id="fileUpload"
												style={{ display: 'none' }}
												onChange={handleMemberCoverImageUpload}
												ref={hiddenFileInput}
											/>
										</div>
									)}
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
												list={[
													makeTabMenuItem({
														link: `/accounts/${email}?options=MYFEED`,
														options: 'MYFEED',
														title: '작성 피드',
													}),
													makeTabMenuItem({
														link: `/accounts/${email}?options=MYSCHEDULE`,
														options: 'MYSCHEDULE',
														title: '작성 일정',
													}),
												]}
												options={query.options}
											></TabMenu>
										</div>
										{query.options === 'MYFEED' && (
											<FeedContainer
												options={query.options}
												handleIsLottie={handleIsLottie}
											/>
										)}
										{query.options === 'MYSCHEDULE' && (
											<ScheduleContainer options={query.options} />
										)}
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
